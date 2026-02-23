import { Link } from 'react-router-dom';

export interface Recipe {
  id: string;
  title: string;
  category?: {
    name: string;
  };
}

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group block rounded-3xl overflow-hidden"
    >
      <div
        className="bg-white border border-gray-200 rounded-3xl p-8
                   shadow-sm hover:shadow-xl hover:-translate-y-2
                   transition-all duration-300"
      >
        {recipe.category && (
          <span
            className="inline-block mb-4 px-4 py-1 text-xs font-semibold
                       bg-indigo-100 text-indigo-600 rounded-full"
          >
            {recipe.category.name}
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
          {recipe.title}
        </h3>

        <div className="mt-6 text-sm text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition">
          View Recipe →
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
