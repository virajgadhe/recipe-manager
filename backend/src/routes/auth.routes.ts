import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
