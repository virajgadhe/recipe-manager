import type { CreateRecipePayload } from '../types/recipe';
import { http } from './http';

export function createRecipe(payload: CreateRecipePayload) {
  return http('/api/recipes', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}
