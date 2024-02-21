const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const cochesRoutes = require("./routes/Coches.js");
app.use("/coches", cochesRoutes);

const clientesRoutes = require("./routes/Clientes.js");
app.use("/clientes", clientesRoutes);

const inventarioRoutes = require("./routes/Inventario.js"); 
app.use("/inventario", inventarioRoutes);

const componentesRoutes = require("./routes/Componentes.js"); 
app.use("/componentes", componentesRoutes);

const ComprasComponentesRoutes = require("./routes/ComprasComponentes.js"); 
app.use("/ComprasComponentes", ComprasComponentesRoutes);

const marcasRoutes = require("./routes/Marcas.js"); 
app.use("/marcas", marcasRoutes);

app.use(express.json());

async function startServer() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Conexión a MongoDB establecida.");

    app.locals.client = client;

    app.listen(port, () => {
      console.log(`El servidor está corriendo en el puerto: ${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

startServer();
