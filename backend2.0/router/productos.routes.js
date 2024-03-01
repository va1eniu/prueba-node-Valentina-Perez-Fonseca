import express from 'express';
import productoController from "../controllers/productos.controllers.js"

const router = express.Router();

router.get('/', productoController.getAllProducto);
router.get('/:id', productoController.getProductoById);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export default router;

