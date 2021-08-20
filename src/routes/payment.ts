import { Router } from 'express';

import { calculateShipment } from '../controllers/payment';
const router = Router();

// POST request
router.post('/shipment', calculateShipment);

export default router;
