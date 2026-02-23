import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipesByCategory } from '../api/public';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-8">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-1 bg-gray-100 rounded w-14" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 h-56"
          />
        ))}
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
    <svg
      className="w-14 h-14 mb-4 opacity-40"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
    <p className="text-base font-medium text-gray-500">
      No recipes in this category
    </p>
    <p className="text-sm text-gray-400 mt-1">
      Check back later or explore other categories.
    </p>
  </div>
);

const CategoryPage = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchRecipes = async () => {
      try {
        const data = await getRecipesByCategory(id);
        if (isMounted) {
          setRecipes(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-indigo-200 uppercase tracking-widest text-xs mb-2">
            Category
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Explore Recipes
          </h1>
        </div>
      </section>
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Recipes in this Category
          </h2>
          {recipes.length > 0 && (
            <p className="mt-3 text-gray-500">
              {' '}
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
              found
            </p>
          )}
        </div>

        {/* Recipe Grid or Empty State */}
        {recipes.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
