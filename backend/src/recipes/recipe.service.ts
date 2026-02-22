import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

interface RecipeInput {
  title: string;
  description: Prisma.InputJsonValue;
  categoryId: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
}

export const createRecipe = async (userId: string, data: RecipeInput) => {
  return prisma.recipe.create({
    data: {
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      authorId: userId,
      status: 'DRAFT',
      ingredients: {
        create: data.ingredients,
      },
    },
    include: {
      category: true,
      ingredients: true,
    },
  });
};

export const getUserRecipes = async (userId: string) => {
  return prisma.recipe.findMany({
    where: { authorId: userId },
    include: {
      category: true,
      ingredients: true,
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const verifyOwnership = async (recipeId: string, userId: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    const error = new Error('Recipe not found') as Error & { status?: number };
    error.status = 404;
    throw error;
  }

  if (recipe.authorId !== userId) {
    const error = new Error('Forbidden') as Error & { status?: number };
    error.status = 403;
    throw error;
  }

  return recipe;
};

export const updateRecipe = async (
  recipeId: string,
  userId: string,
  data: RecipeInput,
) => {
  await verifyOwnership(recipeId, userId);

  return prisma.$transaction(async (tx) => {
    await tx.ingredient.deleteMany({
      where: { recipeId },
    });

    return tx.recipe.update({
      where: { id: recipeId },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        ingredients: {
          create: data.ingredients,
        },
      },
      include: {
        category: true,
        ingredients: true,
      },
    });
  });
};

export const deleteRecipe = async (recipeId: string, userId: string) => {
  await verifyOwnership(recipeId, userId);

  await prisma.recipe.delete({
    where: { id: recipeId },
  });
};
