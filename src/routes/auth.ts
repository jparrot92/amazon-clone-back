import { Router } from 'express';
import { signup, signin, getUser, updateUser } from '../controllers/auth';
import { isAuthenticated } from '../middlewares/verifyToken';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', isAuthenticated, getUser);
router.put('/user', isAuthenticated, updateUser);

export default router;
