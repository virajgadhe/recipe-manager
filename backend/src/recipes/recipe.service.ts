import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { RecipeStatus } from '@prisma/client';

interface RecipeInput {
  title: string;
  description: string;
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

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
          create: data.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          })),
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

export const publishRecipe = async (recipeId: string, userId: string) => {
  await verifyOwnership(recipeId, userId);

  return prisma.recipe.update({
    where: { id: recipeId },
    data: {
      status: RecipeStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });
};

export const unpublishRecipe = async (recipeId: string, userId: string) => {
  await verifyOwnership(recipeId, userId);

  return prisma.recipe.update({
    where: { id: recipeId },
    data: {
      status: RecipeStatus.DRAFT,
      publishedAt: null,
    },
  });
};

export const getPublishedRecipes = async () => {
  return prisma.recipe.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null },
    },
    include: {
      ingredients: true,
      category: true,
      _count: { select: { likes: true } },
    },
  });
};

export const getPublishedRecipeById = async (id: string) => {
  return prisma.recipe.findFirst({
    where: {
      id,
      status: 'PUBLISHED',
    },
    include: {
      ingredients: true,
      category: true,
    },
  });
};

export const getPopularRecipes = async () => {
  return prisma.recipe.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null },
    },
    include: {
      ingredients: true,
      category: true,
      _count: { select: { likes: true } },
    },
    orderBy: {
      likes: { _count: 'desc' },
    },
    take: 10,
  });
};

export const getRecentRecipes = async () => {
  return prisma.recipe.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null },
    },
    include: {
      ingredients: true,
      category: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 10,
  });
};

export const searchRecipes = async (query: string) => {
  if (!query || !query.trim()) {
    return [];
  }

  return prisma.recipe.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null },
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        {
          ingredients: {
            some: { name: { contains: query, mode: 'insensitive' } },
          },
        },
        { category: { name: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: {
      ingredients: true,
      category: true,
    },
  });
};

export const getRecipeByIdForUser = async (
  recipeId: string,
  userId: string,
) => {
  return prisma.recipe.findFirst({
    where: {
      id: recipeId,
      authorId: userId,
    },
    include: {
      category: true,
      ingredients: true,
    },
  });
};
