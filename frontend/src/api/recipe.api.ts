import type {
  CreateRecipePayload,
  RecipeStatus,
  Recipe,
  UpdateRecipePayload,
} from '../types/recipe';
import { http } from './http';

/**
 * Create new recipe (Draft by default)
 */
export function createRecipe(payload: CreateRecipePayload): Promise<Recipe> {
  return http<Recipe>('/api/recipes', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

/**
 * Get current user's recipes
 */
export function getMyRecipes(): Promise<Recipe[]> {
  return http<Recipe[]>('/api/recipes/my-recipes', {
    method: 'GET',
    auth: true,
  });
}

/**
 * Get single recipe by ID
 */
export function getRecipeById(id: string): Promise<Recipe> {
  return http<Recipe>(`/api/recipes/${id}`, {
    method: 'GET',
  });
}

/**
 * Update recipe
 */
export function updateRecipe(
  id: string,
  payload: UpdateRecipePayload,
): Promise<Recipe> {
  return http<Recipe>(`/api/recipes/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(payload),
  });
}

/**
 * Delete recipe
 */
export function deleteRecipe(id: string): Promise<void> {
  return http<void>(`/api/recipes/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

/**
 * Change recipe status (Draft / Publish)
 */
export function updateRecipeStatus(
  id: string,
  status: RecipeStatus,
): Promise<Recipe> {
  return http<Recipe>(`/api/recipes/${id}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({ status }),
  });
}
