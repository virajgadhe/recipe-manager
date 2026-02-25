import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMyRecipes,
  deleteRecipe,
  updateRecipeStatus,
} from '../api/recipe.api';
import type { Recipe, RecipeStatus } from '../types/recipe';

export default function Dashboard() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await getMyRecipes();
      setRecipes(data);
    } catch {
      setError('Failed to load your recipes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?',
    );
    if (!confirmDelete) return;

    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert('Failed to delete recipe.');
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: RecipeStatus,
  ) => {
    const newStatus = currentStatus === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';

    try {
      await updateRecipeStatus(id, newStatus);

      setRecipes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
      );
    } catch {
      alert('Failed to update recipe status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Recipes</h1>
            <p className="text-gray-500 mt-2">
              Manage your drafts and published recipes.
            </p>
          </div>

          <button
            onClick={() => navigate('/recipes/new')}
            className="px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:opacity-95 transition shadow-sm"
          >
            + Create Recipe
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading your recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              No recipes yet
            </h2>
            <p className="text-gray-500 mb-6">
              You haven't created any recipes yet.
            </p>
            <button
              onClick={() => navigate('/recipes/new')}
              className="px-6 py-2.5 rounded-xl text-white font-medium
              bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Create Your First Recipe
            </button>
          </div>
        ) : (
          /* Recipe List */
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {recipe.title}
                  </h2>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full
                      ${
                        recipe.status === 'DRAFT'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {recipe.status === 'DRAFT' ? 'Draft' : 'Published'}
                    </span>

                    {/* Category */}
                    <span className="text-sm text-gray-500">
                      {recipe.category?.name}
                    </span>

                    {/* Date */}
                    <span className="text-sm text-gray-400">
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleToggleStatus(recipe.id, recipe.status)}
                    className="text-blue-600 font-medium hover:text-blue-800 transition"
                  >
                    {recipe.status === 'DRAFT' ? 'Publish' : 'Unpublish'}
                  </button>

                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="text-red-600 font-medium hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
