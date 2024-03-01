// Importar express y otros módulos necesarios
import express from 'express';
import { body } from 'express-validator';
import TiendasPController from '../controllers/tiendas_productos.controller.js'; 
import TiendaController from '../controllers/tiendas.controller.js';

const router = express.Router();
router.get('/tiendas_productos/:id_tienda', TiendasPController.getProductosByTienda);
router.post(
    '/productos/asociar',
    [
      body('id_producto').notEmpty().isNumeric().withMessage('El ID del producto es requerido y debe ser numérico'),
      body('id_tienda').notEmpty().isNumeric().withMessage('El ID de la tienda es requerido y debe ser numérico'),
      body('valor').notEmpty().isNumeric().withMessage('El valor es requerido y debe ser numérico'),
      body('compra_maxima').notEmpty().isNumeric().withMessage('La compra máxima es requerida y debe ser numérica'),
    ],
    TiendasPController.asociarProductoATienda
);

router.get('/', TiendaController.getAllTiendaes);
router.get('/:id', TiendaController.getTiendaById);
router.post('/', TiendaController.createTienda);
router.put('/:id', TiendaController.updateTienda);
router.delete('/:id', TiendaController.deleteTienda);

export default router;
