import { Router } from 'express';
import {
  getAddresses,
  createAddress,
  updateAddress,
  getCountries,
  deleteAddress,
  setDefaultAddress,
} from '../controllers/address';
import { isAuthenticated } from '../middlewares/verifyToken';

const router = Router();

// GET API Get all addresses
router.get('/addresses', isAuthenticated, getAddresses);

// POST API -- Create an address
router.post('/addresses', isAuthenticated, createAddress);

// PUT API -- Update an address
router.put('/addresses/:id', isAuthenticated, updateAddress);

// DELETE API -- Delete an address
router.delete('/addresses/:id', isAuthenticated, deleteAddress);

// PUT API -- Set default address
router.put('/addresses/set/default', isAuthenticated, setDefaultAddress);

// GET API -- Get list of countries
router.get('/countries', getCountries);

export default router;
