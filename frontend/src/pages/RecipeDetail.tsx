import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../api/public';
import { useAuth } from '../context/AuthContext';
import { likeRecipe, unlikeRecipe } from '../api/like.api';

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

  // 👇 added for likes feature
  _count?: { likes: number };
  liked?: boolean;
}

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-3xl px-6 py-16 mx-auto space-y-10 animate-pulse">
      <div className="w-2/3 h-10 bg-gray-200 rounded" />
      <div className="h-40 bg-white border rounded-2xl" />
      <div className="h-24 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);

export default function RecipeDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data: RecipeDetailType = await getRecipeById(id);

        if (!mounted) return;

        setRecipe(data);
        setLikesCount(data._count?.likes ?? 0);
        setLiked(data.liked ?? false);
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

  const toggleLike = async () => {
    if (!user || !recipe) return;

    try {
      if (liked) {
        await unlikeRecipe(recipe.id);
        setLikesCount((c) => c - 1);
      } else {
        await likeRecipe(recipe.id);
        setLikesCount((c) => c + 1);
      }

      setLiked(!liked);
    } catch {
      alert('Failed to update like');
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (notFound || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gray-50">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-800">
          404 - Recipe Not Found
        </h1>
        <p className="max-w-md mb-8 text-gray-500">
          The recipe you are looking for does not exist or is not published.
        </p>
        <Link
          to="/"
          className="px-6 py-3 font-semibold text-white transition bg-indigo-600 shadow rounded-xl hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl px-6 py-16 mx-auto space-y-14">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            {recipe.title}
          </h1>

          <div className="w-16 h-1 bg-indigo-600 rounded-full" />

          {/* ❤️ Likes */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleLike}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  liked
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              ❤️ {liked ? 'Liked' : 'Like'}
            </button>

            <span className="text-sm text-gray-500">{likesCount} likes</span>
          </div>
        </div>

        {/* Ingredients */}
        <section>
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Ingredients
            </h2>

            {recipe.ingredients.length > 0 ? (
              <ul className="space-y-3">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex items-center justify-between px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl"
                  >
                    <span className="font-medium text-gray-800">
                      {ing.name}
                    </span>
                    <span className="px-3 py-1 text-sm text-gray-500 bg-white border rounded-full">
                      {ing.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-400">No ingredients listed.</p>
            )}
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-800">Description</h2>

          <div
            className="p-8 prose bg-white border border-gray-200 shadow-sm prose-gray sm:prose-lg max-w-none rounded-2xl"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
        </section>
      </div>
    </div>
  );
}
