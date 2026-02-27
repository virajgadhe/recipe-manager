import { prisma } from '../lib/prisma';

/**
 * Like a recipe
 */
export const likeRecipe = async (recipeId: string, userId: string) => {
  // ensure recipe exists & is published
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      status: 'PUBLISHED',
    },
  });

  if (!recipe) {
    throw new Error('Recipe not found or not published');
  }

  // prevent duplicate likes safely
  await prisma.like.upsert({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
    update: {},
    create: {
      userId,
      recipeId,
    },
  });

  return { message: 'Liked' };
};

/**
 * Unlike recipe
 */
export const unlikeRecipe = async (recipeId: string, userId: string) => {
  await prisma.like.deleteMany({
    where: { recipeId, userId },
  });

  return { message: 'Unliked' };
};

/**
 * Recipes liked by user
 */
export const getLikedRecipes = async (userId: string) => {
  return prisma.recipe.findMany({
    where: {
      likes: {
        some: { userId },
      },
      status: 'PUBLISHED',
    },
    include: {
      category: true,
      ingredients: true,
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};
