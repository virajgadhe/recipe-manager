import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createRecipe,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
} from './recipe.controller';

const router = Router();

router.post('/', authMiddleware, createRecipe);
router.get('/my-recipes', authMiddleware, getMyRecipes);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;
