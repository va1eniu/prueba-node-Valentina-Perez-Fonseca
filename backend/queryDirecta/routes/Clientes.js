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
    const clientesCollection = db.collection("Clientes");
    const clientes = await clientesCollection.find({}).toArray();
    res.json(clientes);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const clienteId = req.params.id;
    const updatedCliente = req.body;
    await client.connect();
    const db = client.db("test");
    const clientesCollection = db.collection("Clientes");
    await clientesCollection.updateOne(
      { _id: ObjectId(clienteId) },
      { $set: updatedCliente }
    );
    res.json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    const newCliente = req.body;
    await client.connect();
    const db = client.db("test");
    const clientesCollection = db.collection("Clientes");
    const result = await clientesCollection.insertOne(newCliente);
    res.json(result.ops[0]);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const clienteId = req.params.id;
    await client.connect();
    const db = client.db("test");
    const clientesCollection = db.collection("Clientes");
    await clientesCollection.deleteOne({ _id: ObjectId(clienteId) });
    res.json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

module.exports = router;
