import { Router } from "express";
const router = Router();

import upload from '../middlewares/upload-photo';
import { getProducts, getProduct, saveProduct, updateProduct, deleteProduct } from "../controllers/product";

// GET request - create all product
router.get("/products", getProducts);

// GET request - get a single product
router.get("/products/:id", getProduct);

// POST request - create a new product
router.post("/products", upload.single("photo"), saveProduct);

// PUT request - update a single product
router.put("/products/:id", upload.single("photo"), updateProduct);

// DELETE request - delete a single product
router.delete("/products/:id", deleteProduct);

export default router;
