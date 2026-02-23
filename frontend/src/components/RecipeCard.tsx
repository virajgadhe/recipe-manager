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
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
    >
      <div
        className="bg-white border border-gray-200 rounded-xl p-5
                   shadow-sm hover:shadow-md hover:-translate-y-0.5
                   transition-all duration-200 ease-in-out
                   group-focus-visible:border-indigo-400"
      >
        {/* Category badge */}
        {recipe.category && (
          <span
            className="inline-block mb-3 px-2.5 py-0.5 rounded-full
                       text-xs font-semibold tracking-wide
                       bg-indigo-50 text-indigo-600 border border-indigo-100"
          >
            {recipe.category.name}
          </span>
        )}

        {/* Title */}
        <h3
          className="text-base font-bold text-gray-900 leading-snug
                     group-hover:text-indigo-600 transition-colors duration-150"
        >
          {recipe.title}
        </h3>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          View recipe
          <svg
            className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-150"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
