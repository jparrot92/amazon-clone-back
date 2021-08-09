import { Router } from 'express';

import upload from '../middlewares/upload-photo';
import { getOwners, createOwner } from '../controllers/owner';
const router = Router();

// GET request
router.get('/owners', getOwners);

// POST request
router.post('/owners', upload.single('photo'), createOwner);

export default router;
