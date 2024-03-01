// routes.js
import express from 'express';
import { crearPedido, listarPedidosCliente } from '../controllers/pedido.controller.js';

const router = express.Router();

// Rutas relacionadas con pedidos
router.post('/', crearPedido);
router.get('/listar', listarPedidosCliente);


export default router;
