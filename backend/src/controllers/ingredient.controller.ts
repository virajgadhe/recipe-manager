import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

// ADD INGREDIENT
export const addIngredient = async (
  req: Request<
    { recipeId: string },
    unknown,
    { name: string; quantity: string }
  >,
  res: Response,
) => {
  const { recipeId } = req.params;
  const { name, quantity } = req.body;

  const ingredient = await prisma.ingredient.create({
    data: {
      name,
      quantity,
      recipeId,
    },
  });

  res.status(201).json(ingredient);
};

// UPDATE INGREDIENT
export const updateIngredient = async (
  req: Request<{ id: string }, unknown, { name: string; quantity: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updated = await prisma.ingredient.update({
    where: { id },
    data: { name, quantity },
  });

  res.json(updated);
};

// DELETE INGREDIENT
export const deleteIngredient = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  await prisma.ingredient.delete({
    where: { id },
  });

  res.status(204).send();
};
