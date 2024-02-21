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
    const marcasCollection = db.collection("Marcas");
    const marcas = await marcasCollection.find({}).toArray();
    res.json(marcas);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const marcaId = req.params.id;
    const updatedMarca = req.body;
    await client.connect();
    const db = client.db("test");
    const marcasCollection = db.collection("Marcas");
    await marcasCollection.updateOne(
      { _id: ObjectId(marcaId) },
      { $set: updatedMarca }
    );
    res.json({ message: "Marca actualizada exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    const newMarca = req.body;
    await client.connect();
    const db = client.db("test");
    const marcasCollection = db.collection("Marcas");
    const result = await marcasCollection.insertOne(newMarca);
    res.json(result.ops[0]);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const marcaId = req.params.id;
    await client.connect();
    const db = client.db("test");
    const marcasCollection = db.collection("Marcas");
    await marcasCollection.deleteOne({ _id: ObjectId(marcaId) });
    res.json({ message: "Marca eliminada exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

module.exports = router;
