import { Router } from 'express';
import { authenticate, optionalAuth } from '../middlewares/auth.middleware';
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
  getRecipeForEdit,
  updateRecipeStatus,
} from './recipe.controller';

const router = Router();

router.get('/popular', getPopularRecipes);
router.get('/recent', getRecentRecipes);
router.get('/search', searchRecipes);
router.get('/my-recipes', authenticate, getMyRecipes);
router.get('/:id/edit', authenticate, getRecipeForEdit);
router.get('/', getPublishedRecipes);
router.get('/:id', optionalAuth, getRecipeById);

router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);
router.patch('/:id/status', authenticate, updateRecipeStatus);

export default router;
