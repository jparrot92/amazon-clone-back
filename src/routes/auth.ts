import { Router } from 'express';
import { signup, signin, user } from '../controllers/auth';
import { isAuthenticated } from '../middlewares/verifyToken';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', isAuthenticated, user);

export default router;
