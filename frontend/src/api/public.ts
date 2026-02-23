const API = import.meta.env.VITE_API_URL;

export const getPopularRecipes = async () => {
  const res = await fetch(`${API}/recipes/popular`);
  if (!res.ok) throw new Error('Failed to fetch popular');
  return res.json();
};

export const getRecentRecipes = async () => {
  const res = await fetch(`${API}/recipes/recent`);
  if (!res.ok) throw new Error('Failed to fetch recent');
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API}/categories`);
  return res.json();
};

export const getRecipeById = async (id: string) => {
  const res = await fetch(`${API}/recipes/${id}`);
  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
};

export const getRecipesByCategory = async (id: string) => {
  const res = await fetch(`${API}/categories/${id}/recipes`);
  return res.json();
};

export const searchRecipes = async (query: string) => {
  const res = await fetch(`${API}/recipes/search?q=${query}`);
  return res.json();
};
