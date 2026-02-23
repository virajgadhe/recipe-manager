import { useEffect, useState } from 'react';
import {
  getPopularRecipes,
  getRecentRecipes,
  getCategories,
} from '../api/public';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
}

const Home = () => {
  const [popular, setPopular] = useState<Recipe[]>([]);
  const [recent, setRecent] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPopularRecipes(),
      getRecentRecipes(),
      getCategories(),
    ]).then(([pop, rec, cat]) => {
      setPopular(pop);
      setRecent(rec);
      setCategories(cat);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Cook. Share. Inspire.
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-10">
            Discover trending recipes, explore categories, and share your own
            creations with the world.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/search"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {/* Popular */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              🔥 Popular Recipes
            </h2>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        {/* Recent */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            🆕 Recently Published
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            📂 Browse by Category
          </h2>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
