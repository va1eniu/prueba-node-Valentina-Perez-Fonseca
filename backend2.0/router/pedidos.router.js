import express from 'express';
import { crearPedido, listarPedidosCliente } from '../controllers/pedido.controller.js';

const router = express.Router();

router.post('/', crearPedido);
router.get('/listar', listarPedidosCliente);


export default router;
