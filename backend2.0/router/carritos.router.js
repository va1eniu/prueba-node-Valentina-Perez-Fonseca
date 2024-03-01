// carritos.router.js
import express from 'express';
import CarritoController from '../controllers/carritos.controller.js';

const router = express.Router();

router.post('/', CarritoController.agregarProductoAlCarrito);
router.get('/listar/:id_tienda/:id_user', CarritoController.listarProductosEnCarrito);

export default router;
