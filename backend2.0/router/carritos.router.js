// carritos.router.js
import express from 'express';
import CarritoController from '../controllers/carritos.controller.js';

const router = express.Router();

// Rutas de la entidad Carrito
router.post('/', CarritoController.agregarProductoAlCarrito);
router.get('/listar/:id_tienda/:id_user', CarritoController.listarProductosEnCarrito);
// Agrega más rutas según sea necesario

export default router;
