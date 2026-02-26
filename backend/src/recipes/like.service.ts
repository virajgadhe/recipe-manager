import { prisma } from '../lib/prisma';

/**
 * Like a recipe
 */
export const likeRecipe = async (recipeId: string, userId: string) => {
  // ensure recipe exists & is published
  const recipe = await prisma.recipe.findFirst({
    where: { id: recipeId, status: 'PUBLISHED' },
  });

  if (!recipe) {
    const error = new Error('Recipe not found or not published') as Error & {
      status?: number;
    };
    error.status = 404;
    throw error;
  }

  // prevent duplicate likes
  await prisma.like.create({
    data: { recipeId, userId },
  });

  return { message: 'Recipe liked' };
};

/**
 * Unlike recipe
 */
export const unlikeRecipe = async (recipeId: string, userId: string) => {
  await prisma.like.delete({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  return { message: 'Recipe unliked' };
};

/**
 * Get recipes liked by user
 */
export const getLikedRecipes = async (userId: string) => {
  return prisma.recipe.findMany({
    where: {
      likes: {
        some: { userId },
      },
    },
    include: {
      category: true,
      ingredients: true,
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};
