import { Router } from 'express';
import { isAuthenticated } from '../middlewares/verifyToken';

import { calculateShipment, createPayment } from '../controllers/payment';
const router = Router();

// POST request
router.post('/shipment', calculateShipment);

router.post('/payment', isAuthenticated, createPayment);

export default router;
