import { useEffect, useState } from 'react';
import {
  getPopularRecipes,
  getRecentRecipes,
  getCategories,
} from '../api/public';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [popular, setPopular] = useState<Recipe[]>([]);
  const [recent, setRecent] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  interface Category {
    id: string;
    name: string;
  }

  useEffect(() => {
    getPopularRecipes().then(setPopular);
    getRecentRecipes().then(setRecent);
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-3">Popular Recipes</h2>
        <div className="grid gap-4">
          {popular.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Recent Recipes</h2>
        <div className="grid gap-4">
          {recent.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Categories</h2>
        <div className="flex gap-4 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="text-blue-600 underline"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
