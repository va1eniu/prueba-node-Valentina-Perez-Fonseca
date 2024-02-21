const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function handleError(res, error) {
  console.error(error);
  res.status(500).json({ error: "Error en el servidor" });
}

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("test");
    const componentesCollection = db.collection("Componentes");
    const componentes = await componentesCollection.find({}).toArray();
    res.json(componentes);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const componenteId = req.params.id;
    const updatedComponente = req.body;
    await client.connect();
    const db = client.db("test");
    const componentesCollection = db.collection("Componentes");
    await componentesCollection.updateOne(
      { _id: ObjectId(componenteId) },
      { $set: updatedComponente }
    );
    res.json({ message: "Componente actualizado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    const newComponente = req.body;
    await client.connect();
    const db = client.db("test");
    const componentesCollection = db.collection("Componentes");
    const result = await componentesCollection.insertOne(newComponente);
    res.json(result.ops[0]);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const componenteId = req.params.id;
    await client.connect();
    const db = client.db("test");
    const componentesCollection = db.collection("Componentes");
    await componentesCollection.deleteOne({ _id: ObjectId(componenteId) });
    res.json({ message: "Componente eliminado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

module.exports = router;
