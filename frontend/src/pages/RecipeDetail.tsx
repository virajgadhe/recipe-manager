import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../api/public';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

interface RecipeDetailType {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
}

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded-md w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/3" />
      </div>
      {/* Ingredients skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-3/4" />
        ))}
      </div>
      {/* Description skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  </div>
);

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);

  useEffect(() => {
    if (id) getRecipeById(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {recipe.title}
          </h1>
          <div className="mt-2 h-1 w-14 bg-indigo-500 rounded-full" />
        </div>

        {/* Ingredients */}
        <section>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                {recipe.ingredients.length}
              </span>
              Ingredients
            </h2>
            {recipe.ingredients.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex items-center justify-between py-2.5 text-sm text-gray-700"
                  >
                    <span className="font-medium text-gray-900">
                      {ing.name}
                    </span>
                    <span className="ml-4 text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-0.5 text-xs">
                      {ing.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No ingredients listed.
              </p>
            )}
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Description
          </h2>
          <div
            className="prose prose-gray prose-sm sm:prose-base max-w-none
                       prose-headings:font-semibold prose-headings:text-gray-800
                       prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                       prose-li:marker:text-indigo-400
                       bg-white border border-gray-200 rounded-xl shadow-sm p-6"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
