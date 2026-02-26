import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { updateProfile, changePassword } from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.put('/me', updateProfile);
router.put('/me/password', changePassword);

export default router;
