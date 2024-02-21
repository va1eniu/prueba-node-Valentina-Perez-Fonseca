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
    const inventarioCollection = db.collection("Inventario");
    const coches = await inventarioCollection.find({}).toArray();
    res.json(coches);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cocheId = req.params.id;
    const updatedCoche = req.body;
    await client.connect();
    const db = client.db("test");
    const inventarioCollection = db.collection("Inventario");
    await inventarioCollection.updateOne(
      { _id: ObjectId(cocheId) },
      { $set: updatedCoche }
    );
    res.json({ message: "Coche actualizado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    const newCoche = req.body;
    await client.connect();
    const db = client.db("test");
    const inventarioCollection = db.collection("Inventario");
    const result = await inventarioCollection.insertOne(newCoche);
    res.json(result.ops[0]);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cocheId = req.params.id;
    await client.connect();
    const db = client.db("test");
    const inventarioCollection = db.collection("Inventario");
    await inventarioCollection.deleteOne({ _id: ObjectId(cocheId) });
    res.json({ message: "Coche eliminado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

module.exports = router;
