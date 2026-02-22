import express from 'express';
import {
  getCategories,
  getRecipesByCategory,
} from '../controllers/category.controller';

const router = express.Router();

// REMOVE extra "categories" prefix
router.get('/', getCategories);
router.get('/:id/recipes', getRecipesByCategory);

export default router;
