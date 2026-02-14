import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createRecipe,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
} from './recipe.controller';

const router = Router();
console.log('Recipe routes file loaded');

router.post('/', authenticate, createRecipe);
router.get('/my-recipes', authenticate, getMyRecipes);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
