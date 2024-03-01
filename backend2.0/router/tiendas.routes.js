// Importar express y otros módulos necesarios
import express from 'express';
import { body } from 'express-validator';
import TiendasPController from '../controllers/tiendas_productos.controller.js';  // Asegúrate de tener el nombre correcto aquí
import TiendaController from '../controllers/tiendas.controller.js';

// Crear un router de Express
const router = express.Router();

// Definir las rutas
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

// Rutas para las promociones
router.get('/', TiendaController.getAllTiendaes);
router.get('/:id', TiendaController.getTiendaById);
router.post('/', TiendaController.createTienda);
router.put('/:id', TiendaController.updateTienda);
router.delete('/:id', TiendaController.deleteTienda);

// Exportar el router
export default router;
