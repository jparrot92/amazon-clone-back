import { Router } from 'express';
import { isAuthenticated } from '../middlewares/verifyToken';
import upload from '../middlewares/upload-photo';
import { createReview, getReview } from '../controllers/review';

const router = Router();

router.post(
  '/review/:productID',
  isAuthenticated,
  upload.single('photo'),
  createReview
);

router.get('/reviews/:productID', getReview);

export default router;
