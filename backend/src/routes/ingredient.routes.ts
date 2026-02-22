import express from 'express';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from '../controllers/ingredient.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/:recipeId/ingredients', addIngredient);
router.put('/ingredients/:id', updateIngredient);
router.delete('/ingredients/:id', deleteIngredient);

export default router;
