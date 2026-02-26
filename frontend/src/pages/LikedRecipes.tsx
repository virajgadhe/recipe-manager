import { useEffect, useState } from "react";
import { getLikedRecipes } from "../api/like.api";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../components/RecipeCard";

export default function LikedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikedRecipes();
        setRecipes(data);
      } catch {
        console.error("Failed to fetch liked recipes");
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="min-h-screen px-6 bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-10 text-3xl font-bold text-gray-900">
          ❤️ Liked Recipes
        </h1>

        {recipes.length === 0 ? (
          <p className="text-gray-500">No liked recipes yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
