import { Router } from "express";
const router = Router();

import { getCategories, createCategory } from "../controllers/category";

// GET request
router.get("/categories", getCategories);

// POST request
router.post("/categories", createCategory);

export default router;