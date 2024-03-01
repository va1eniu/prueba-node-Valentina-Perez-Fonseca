
import express from 'express';
import Tiendas_promocionesController from '../controllers/tiendas_promocion.controllers.js';

const router = express.Router();

router.get('/', Tiendas_promocionesController.getAllTiendas_promocioneses);
router.get('/:id', Tiendas_promocionesController.getAllTiendas_promocioneses);
router.post('/', Tiendas_promocionesController.createTiendas_promociones);
router.put('/:id', Tiendas_promocionesController.updateTiendas_promociones);
router.delete('/:id', Tiendas_promocionesController.deleteTiendas_promociones);

export default router;

