import type { CreateRecipePayload, RecipeStatus } from '../types/recipe';
import { http } from './http';

/**
 * Create new recipe (Draft by default)
 */
export function createRecipe(payload: CreateRecipePayload) {
  return http('/api/recipes', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

/**
 * Get current user's recipes
 */
export function getMyRecipes() {
  return http('/api/recipes/me', {
    method: 'GET',
    auth: true,
  });
}

/**
 * Get single recipe by ID
 */
export function getRecipeById(id: string) {
  return http(`/api/recipes/${id}`, {
    method: 'GET',
  });
}

/**
 * Update recipe
 */
export function updateRecipe(
  id: string,
  payload: Partial<CreateRecipePayload>,
) {
  return http(`/api/recipes/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(payload),
  });
}

/**
 * Delete recipe
 */
export function deleteRecipe(id: string) {
  return http(`/api/recipes/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

/**
 * Change recipe status (Draft / Publish)
 */
export function updateRecipeStatus(id: string, status: RecipeStatus) {
  return http(`/api/recipes/${id}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({ status }),
  });
}
