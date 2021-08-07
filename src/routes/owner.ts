import { Router } from "express";
const router = Router();

import upload from '../middlewares/upload-photo';
import { getOwners, createOwner } from "../controllers/owner";

// GET request
router.get('/owners', getOwners);

// POST request
router.post('/owners', upload.single("photo"), createOwner);



export default router;
