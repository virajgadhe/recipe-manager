import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  likeRecipe,
  unlikeRecipe,
  getLikedRecipes,
} from '../controllers/like.controller';

const router = Router();

router.post('/recipes/:id/like', authenticate, likeRecipe);
router.delete('/recipes/:id/like', authenticate, unlikeRecipe);
router.get('/likes', authenticate, getLikedRecipes);

export default router;
