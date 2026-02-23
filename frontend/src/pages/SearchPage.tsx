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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Page Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-1">
            Discover
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Search Recipes
          </h1>
          <div className="mt-2 h-1 w-14 bg-indigo-500 rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white
                         text-sm text-gray-900 placeholder-gray-400 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                         transition duration-150"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search recipes..."
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-indigo-600 text-white text-sm font-semibold shadow-sm
                       hover:bg-indigo-700 active:scale-95 disabled:opacity-60
                       disabled:cursor-not-allowed transition-all duration-150"
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
