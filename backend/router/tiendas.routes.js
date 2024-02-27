/* import { Router } from "express";
import {
  obtenertiendass,
  agregartiendas,
  borrartiendas,
  actualizartiendas,
  obtenertiendas,
} from "../controllers/tiendas.controllers.js";

const router = Router();

router.get("/", obtenertiendass);
router.post("/", agregartiendas);
router.delete("/:id", borrartiendas);
router.patch("/:id", actualizartiendas);
router.get("/:id", obtenertiendas);

export default router;

 */

import express from 'express';
import TiendasPController from '../controllers/tiendasProductos.controller.js';
import tiendasController from '../controllers/tiendas.controllers.js';


const router = express.Router();

router.get('/:id_tienda', TiendasPController.getProductosByTienda); 

// Rutas para las promociones
router.get('/', tiendasController.getAlltiendases);
router.get('/:id', tiendasController.gettiendasById);
router.post('/', tiendasController.createtiendas);
router.put('/:id', tiendasController.updatetiendas);
router.delete('/:id', tiendasController.deletetiendas);



export default router;