const API = import.meta.env.VITE_API_URL;

export const getPopularRecipes = async () => {
  const res = await fetch(`${API}/api/recipes/popular`);
  if (!res.ok) throw new Error('Failed to fetch popular recipes');
  return res.json();
};

export const getRecentRecipes = async () => {
  const res = await fetch(`${API}/api/recipes/recent`);
  if (!res.ok) throw new Error('Failed to fetch recent recipes');
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const getRecipeById = async (id: string) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/api/recipes/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
};

export const getRecipesByCategory = async (id: string) => {
  const res = await fetch(`${API}/api/categories/${id}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch category recipes');
  return res.json();
};

export const searchRecipes = async (query: string) => {
  const res = await fetch(
    `${API}/api/recipes/search?q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};
