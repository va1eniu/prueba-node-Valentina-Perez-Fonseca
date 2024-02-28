import express from "express";
import tiendasRouter from "../router/tiendas.routes.js"
import productosRouter from "../router/productos.routes.js";
import Tiendas_promocionesRouter from "../router/Tiendas_promociones.router.js";
import conectarDB from "../database/config.js";
import promocionRouter from "../router/promocion.routes.js";
import usersRouter from "../router/users.routes.js"



class Server {
  constructor() {
    this.app = express();
    this.connect();
    this.port = process.env.PORT || 7000; 
    this.middlewares();
    this.paths = {
     
      productosPath: "/productos",
      tiendasPath: "/tiendas",
      promocionPath: "/promociones",
      usersPath: "/users",
      Tiendas_promocionesPath: "/tiendas_promociones"

      /* comprasClientPath: "/compras_clientes", */
      
    };
    this.routes();
    
  }

  async connect() {
    try {
      await conectarDB();
      console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
      console.error(`Error al conectar a la base de datos: ${error.message}`);
      process.exit(1); // Detiene la ejecución de la aplicación en caso de error
    }
  }
  

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    console.log('ayudaaa');
    this.app.use(this.paths.productosPath, productosRouter);
    this.app.use(this.paths.tiendasPath, tiendasRouter);
    this.app.use(this.paths.promocionPath, promocionRouter);
    this.app.use(this.paths.usersPath, usersRouter);
    this.app.use(this.paths.Tiendas_promocionesPath, Tiendas_promocionesRouter);

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
