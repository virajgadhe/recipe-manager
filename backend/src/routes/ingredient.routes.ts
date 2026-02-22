import express from 'express';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from '../controllers/ingredient.controller';

const router = express.Router();

// REMOVE extra "/recipes"
router.post('/:recipeId/ingredients', addIngredient);
router.put('/ingredients/:id', updateIngredient);
router.delete('/ingredients/:id', deleteIngredient);

export default router;
