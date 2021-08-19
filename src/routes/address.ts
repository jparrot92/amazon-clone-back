import { Router } from 'express';
import {
  getAddresses,
  createAddress,
  getCountries,
} from '../controllers/address';
import { isAuthenticated } from '../middlewares/verifyToken';

const router = Router();

// GET request
router.get('/addresses', isAuthenticated, getAddresses);

// POST request
router.post('/addresses', isAuthenticated, createAddress);

router.get('/countries', getCountries);

export default router;
