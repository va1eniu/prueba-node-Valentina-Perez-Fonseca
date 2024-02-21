import express from "express";
import productosRouter from "../router/productos.routes.js";
import tiendasRouter from "../router/tiendas.routes.js"
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
      tiendas_productosPath: "/tiendas_productos",
      usersPath: "/users",
      /* comprasClientPath: "/compras_clientes", */
      
    };
    this.routes();
    
  }

  async connect() {
    await conectarDB();
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

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
