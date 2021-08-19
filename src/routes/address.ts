import { Router } from 'express';
import {
  getAddresses,
  getAddress,
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

// GET API -- Get one address for update
router.get('/addresses/:id', isAuthenticated, getAddress);

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
