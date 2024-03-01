// routes.js
import express from 'express';
import { crearPedido } from '../controllers/pedido.controller.js';

const router = express.Router();

// Rutas relacionadas con pedidos
router.post('/', crearPedido);

export default router;
