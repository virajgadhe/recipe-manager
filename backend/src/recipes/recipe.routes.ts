import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createRecipe,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
  getPublishedRecipes,
  getRecipeById,
  getPopularRecipes,
  getRecentRecipes,
  searchRecipes,
} from './recipe.controller';

const router = Router();

router.get('/popular', getPopularRecipes);
router.get('/recent', getRecentRecipes);
router.get('/search', searchRecipes);
router.get('/my-recipes', authenticate, getMyRecipes);
router.get('/', getPublishedRecipes);
router.get('/:id', getRecipeById);

router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
