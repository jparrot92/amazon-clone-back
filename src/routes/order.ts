import { Router } from 'express';
import { isAuthenticated } from '../middlewares/verifyToken';

import { getOrders } from '../controllers/order';
const router = Router();

// GET request
router.get('/orders', isAuthenticated, getOrders);

export default router;
