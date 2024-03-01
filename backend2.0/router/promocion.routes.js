import express from 'express';
import PromocionController from '../controllers/promocion.controllers.js';

const router = express.Router();

router.get('/', PromocionController.getAllPromociones);
router.get('/:id', PromocionController.getPromocionById);
router.post('/', PromocionController.createPromocion);
router.put('/:id', PromocionController.updatePromocion);
router.delete('/:id', PromocionController.deletePromocion);

export default router;
