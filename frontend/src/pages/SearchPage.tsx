import { useState } from 'react';
import { searchRecipes } from '../api/public';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../components/RecipeCard';

const EmptyState = ({ query }: { query: string }) => (
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
      />
    </svg>
    <p className="text-base font-medium text-gray-500">No results found</p>
    {query.trim().length > 0 && (
      <p className="text-sm text-gray-400 mt-1">
        We couldn't find any recipes matching{' '}
        <span className="font-semibold text-gray-500">"{query}"</span>
      </p>
    )}
    <p className="text-sm text-gray-400 mt-1">Try a different keyword.</p>
  </div>
);

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const fetched = await searchRecipes(query);
      setResults(fetched);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Search Recipes
          </h1>
          <p className="text-indigo-200 mt-3">
            Find recipes by title, ingredients, or category.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Page Header */}
        <div className="text-center">
          {' '}
          <h2 className="text-2xl font-bold text-gray-900">
            Start Searching {' '}
          </h2>{' '}
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          {' '}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
                />
              </svg>
            </div>
            <input
              className="w-full pl-10 pr-4 py-4 rounded-full border border-gray-200 bg-white
                         text-sm text-gray-900 placeholder-gray-400 shadow
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                         transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search recipes..."
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                       bg-indigo-600 text-white text-sm font-semibold shadow-lg
                       hover:bg-indigo-700 active:scale-95 disabled:opacity-60
                       transition"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Searching…
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            {results.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-5">
                  {results.length} {results.length === 1 ? 'result' : 'results'}{' '}
                  for{' '}
                  <span className="font-semibold text-gray-700">"{query}"</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState query={query} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
