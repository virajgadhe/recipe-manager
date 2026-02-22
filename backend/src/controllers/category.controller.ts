import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

// FETCH CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      message: 'Failed to fetch categories',
    });
  }
};

// BROWSE RECIPES BY CATEGORY

export const getRecipesByCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    // Step 1: Check category exists
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    // Step 2: Fetch recipes
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

    // Step 3: If empty, return message
    if (recipes.length === 0) {
      return res.status(200).json({
        message: 'No published recipes found in this category',
        recipes: [],
      });
    }

    return res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return res.status(500).json({
      message: 'Failed to fetch recipes',
    });
  }
};
