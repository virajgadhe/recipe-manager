import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as recipeService from './recipe.service';
import { recipeSchema } from './recipe.validation';

export const createRecipe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('REQ BODY:', req.body); // 👈 add this

    const userId = req.userId!;

    const validatedData = recipeSchema.parse(req.body);

    const recipe = await recipeService.createRecipe(userId, validatedData);

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getMyRecipes = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId!;

    const recipes = await recipeService.getUserRecipes(userId);

    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipeId = req.params.id as string;
    const userId = req.userId!;

    const validatedData = recipeSchema.parse(req.body);

    const updated = await recipeService.updateRecipe(
      recipeId,
      userId,
      validatedData,
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipeId = req.params.id as string;
    const userId = req.userId!;

    await recipeService.deleteRecipe(recipeId, userId);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};
