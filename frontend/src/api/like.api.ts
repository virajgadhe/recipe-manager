import { http } from './http';
import type { Recipe } from '../types/recipe';

export const likeRecipe = (id: string) =>
  http(`/api/recipes/${id}/like`, {
    method: 'POST',
    auth: true,
  });

export const unlikeRecipe = (id: string) =>
  http(`/api/recipes/${id}/like`, {
    method: 'DELETE',
    auth: true,
  });

export const getLikedRecipes = () =>
  http<Recipe[]>('/api/likes', { auth: true });
