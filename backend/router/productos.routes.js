/* import { Router } from "express";
import {
  obtenerproductoss,
  agregarproductos,
  borrarproductos,
  actualizarproductos,
  obtenerproductos,
} from "../controllers/productos.controllers.js";

const router = Router();

router.get("/get", obtenerproductoss);
router.post("/post", agregarproductos);
router.delete("/:id", borrarproductos);
router.patch("/:id", actualizarproductos);
router.get("/:id", obtenerproductos);

export default router; */

import express from 'express';
import ProductosController from '../controllers/productos.controllers.js';

const router = express.Router();

// Rutas relacionadas con Productos
router.get('/', ProductosController.getAllProductos);
router.get('/:id', ProductosController.getProductoById);
router.post('/', ProductosController.createProducto);
router.put('/:id', ProductosController.updateProducto);
router.delete('/:id', ProductosController.deleteProducto);

export default router;

