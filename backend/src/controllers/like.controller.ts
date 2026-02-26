import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as likeService from '../recipes/like.service';

type Params = {
  id: string;
};

export const likeRecipe = async (
  req: AuthRequest & { params: Params },
  res: Response,
) => {
  try {
    const userId = req.userId!;
    const recipeId = req.params.id;

    const result = await likeService.likeRecipe(recipeId, userId);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const unlikeRecipe = async (
  req: AuthRequest & { params: Params },
  res: Response,
) => {
  try {
    const userId = req.userId!;
    const recipeId = req.params.id;

    const result = await likeService.unlikeRecipe(recipeId, userId);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getLikedRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const recipes = await likeService.getLikedRecipes(userId);
    res.json(recipes);
  } catch {
    res.status(500).json({ message: 'Failed to fetch liked recipes' });
  }
};
