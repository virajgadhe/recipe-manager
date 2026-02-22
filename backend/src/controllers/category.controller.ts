import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

// FETCH CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  res.json(categories);
};

// BROWSE RECIPES BY CATEGORY
export const getRecipesByCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const recipes = await prisma.recipe.findMany({
    where: {
      categoryId: id,
      status: 'PUBLISHED',
    },
    include: {
      ingredients: true,
      category: true,
    },
  });

  res.json(recipes);
};
