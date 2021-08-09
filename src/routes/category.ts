import { Router } from 'express';

import { getCategories, createCategory } from '../controllers/category';
const router = Router();

// GET request
router.get('/categories', getCategories);

// POST request
router.post('/categories', createCategory);

export default router;
