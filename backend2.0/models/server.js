import express from "express";


import productosRouter from "../router/productos.routes.js";
import tiendaRouter from "../router/tiendas.routes.js";
import carritoRouter from "../router/carritos.router.js";
import pedidosRouter from "../router/pedidos.router.js";


import conectarDB from "../database/config.js";



class Server {
  constructor() {
    this.app = express();
    this.connect();
    this.port = process.env.PORT || 7000; 
    this.middlewares();
    this.paths = {
     
      productosPath: "/productos",
      tiendasPath:"/tiendas",
      carritoPath: "/carrito",
      pedidoPath: "/pedidos"
      
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
    this.app.use(this.paths.tiendasPath, tiendaRouter);
    this.app.use(this.paths.carritoPath, carritoRouter);
    this.app.use(this.paths.pedidoPath, pedidosRouter);

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
