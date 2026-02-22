import { prisma } from '../lib/prisma';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

type IngredientBody = {
  name: string;
  quantity: string;
};

export const addIngredient = async (
  req: AuthRequest & {
    params: { recipeId: string };
    body: IngredientBody;
  },
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { recipeId } = req.params;
    const { name, quantity } = req.body;

    // 🔐 Ownership check
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
        authorId: req.userId,
      },
    });

    if (!recipe) {
      return res.status(403).json({
        message: 'You are not allowed to modify this recipe',
      });
    }

    const ingredient = await prisma.ingredient.create({
      data: { name, quantity, recipeId },
    });

    return res.status(201).json(ingredient);
  } catch (error) {
    console.error('Error adding ingredient:', error);
    return res.status(500).json({ message: 'Failed to add ingredient' });
  }
};

export const updateIngredient = async (
  req: AuthRequest & {
    params: { id: string };
    body: IngredientBody;
  },
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const { name, quantity } = req.body;

    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
      include: { recipe: true },
    });

    if (!ingredient) {
      return res.status(404).json({
        message: 'Ingredient not found',
      });
    }

    // 🔐 Ownership validation
    if (ingredient.recipe.authorId !== req.userId) {
      return res.status(403).json({
        message: 'You are not allowed to update this ingredient',
      });
    }

    const updated = await prisma.ingredient.update({
      where: { id },
      data: { name, quantity },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error updating ingredient:', error);
    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
};

export const deleteIngredient = async (
  req: AuthRequest & {
    params: { id: string };
  },
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
      include: { recipe: true },
    });

    if (!ingredient) {
      return res.status(404).json({
        message: 'Ingredient not found',
      });
    }

    // 🔐 Ownership validation
    if (ingredient.recipe.authorId !== req.userId) {
      return res.status(403).json({
        message: 'You are not allowed to delete this ingredient',
      });
    }

    await prisma.ingredient.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    return res.status(500).json({ message: 'Failed to delete ingredient' });
  }
};
