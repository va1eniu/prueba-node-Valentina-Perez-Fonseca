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
    const comprasComponentesCollection = db.collection("ComprasComponentes");
    const comprasComponentes = await comprasComponentesCollection.find({}).toArray();
    res.json(comprasComponentes);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const compraComponentesId = req.params.id;
    const updatedCompraComponentes = req.body;
    await client.connect();
    const db = client.db("test");
    const comprasComponentesCollection = db.collection("ComprasComponentes");
    await comprasComponentesCollection.updateOne(
      { _id: ObjectId(compraComponentesId) },
      { $set: updatedCompraComponentes }
    );
    res.json({ message: "Compra de componentes actualizada exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    const newCompraComponentes = req.body;
    await client.connect();
    const db = client.db("test");
    const comprasComponentesCollection = db.collection("ComprasComponentes");
    const result = await comprasComponentesCollection.insertOne(newCompraComponentes);
    res.json(result.ops[0]);
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const compraComponentesId = req.params.id;
    await client.connect();
    const db = client.db("test");
    const comprasComponentesCollection = db.collection("ComprasComponentes");
    await comprasComponentesCollection.deleteOne({ _id: ObjectId(compraComponentesId) });
    res.json({ message: "Compra de componentes eliminada exitosamente" });
  } catch (error) {
    handleError(res, error);
  } finally {
    client.close();
  }
});

module.exports = router;
