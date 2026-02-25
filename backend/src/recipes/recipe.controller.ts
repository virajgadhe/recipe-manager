import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as recipeService from './recipe.service';
import { recipeSchema } from './recipe.validation';
import { Request } from 'express';

export const createRecipe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('REQ BODY:', req.body);

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

export const getPublishedRecipes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipes = await recipeService.getPublishedRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const recipe = await recipeService.getPublishedRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};
export const getPopularRecipes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipes = await recipeService.getPopularRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecentRecipes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipes = await recipeService.getRecentRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const searchRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query.q as string;

    const recipes = await recipeService.searchRecipes(query);

    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipeForEdit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const recipeId = req.params.id as string;
    const userId = req.userId!;

    const recipe = await recipeService.getRecipeByIdForUser(recipeId, userId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};
