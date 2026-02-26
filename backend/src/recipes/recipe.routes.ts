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
  getRecipeForEdit,
  updateRecipeStatus,
} from './recipe.controller';

const router = Router();

// Public recipe feeds
router.get('/popular', getPopularRecipes);
router.get('/recent', getRecentRecipes);
router.get('/search', searchRecipes);

// Authenticated routes
router.get('/my-recipes', authenticate, getMyRecipes);
router.get('/:id/edit', authenticate, getRecipeForEdit);
router.patch('/:id/status', authenticate, updateRecipeStatus);

// Public viewing
router.get('/', getPublishedRecipes);
router.get('/:id', getRecipeById);

// CRUD
router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
