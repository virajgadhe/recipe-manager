import { useParams, Link } from 'react-router-dom';
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
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-2/3" />
      <div className="bg-white rounded-2xl border h-40" />
      <div className="h-24 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data = await getRecipeById(id);
        if (mounted) setRecipe(data);
      } catch {
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRecipe();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (notFound || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          404 - Recipe Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The recipe you are looking for does not exist or is not published.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            {recipe.title}
          </h1>
          <div className="h-1 w-16 bg-indigo-600 rounded-full" />
        </div>

        {/* Ingredients Section */}
        <section>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Ingredients
            </h2>

            {recipe.ingredients.length > 0 ? (
              <ul className="space-y-3">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100"
                  >
                    <span className="font-medium text-gray-800">
                      {ing.name}
                    </span>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                      {ing.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No ingredients listed.</p>
            )}
          </div>
        </section>

        {/* Description Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Description</h2>
          <div
            className="prose prose-gray sm:prose-lg max-w-none
                       bg-white border border-gray-200 rounded-2xl shadow-sm p-8
                       prose-headings:font-semibold prose-headings:text-gray-900
                       prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                       prose-li:marker:text-indigo-500"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
