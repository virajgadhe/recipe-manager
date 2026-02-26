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
  publishRecipe,
  unpublishRecipe,
} from './recipe.controller';

const router = Router();

// Public recipe feeds
router.get('/popular', getPopularRecipes);
router.get('/recent', getRecentRecipes);
router.get('/search', searchRecipes);

// Authenticated routes
router.get('/my-recipes', authenticate, getMyRecipes);
router.get('/:id/edit', authenticate, getRecipeForEdit);

router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

// Draft & Publish logic
router.patch('/:id/publish', authenticate, publishRecipe);
router.patch('/:id/unpublish', authenticate, unpublishRecipe);

// Public viewing
router.get('/', getPublishedRecipes);
router.get('/:id', getRecipeById);

export default router;
