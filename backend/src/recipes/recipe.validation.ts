import { z } from 'zod';

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
});

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().uuid('Invalid category ID'),
  ingredients: z
    .array(ingredientSchema)
    .min(1, 'At least one ingredient required'),
});

export {};
