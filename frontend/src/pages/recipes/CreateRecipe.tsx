import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { getCategories } from '../../api/public';
import { createRecipe } from '../../api/recipe.api';

interface Category {
  id: string;
  name: string;
}

interface Ingredient {
  name: string;
  quantity: string;
}

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[180px] focus:outline-none px-4 py-3 text-gray-700',
      },
    },
  });

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []);

  // Ingredient handlers
  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string,
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    );
  };

  const isFormValid = useMemo(() => {
    return (
      title.trim().length > 0 &&
      categoryId.length > 0 &&
      ingredients.some(
        (i) => i.name.trim().length > 0 && i.quantity.trim().length > 0,
      )
    );
  }, [title, categoryId, ingredients]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!isFormValid) {
      setError('Please complete all required fields.');
      return;
    }

    const cleanedIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim(),
    );

    const description = editor?.getHTML() ?? '';

    try {
      setLoading(true);

      await createRecipe({
        title: title.trim(),
        categoryId,
        ingredients: cleanedIngredients,
        description,
      });

      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 bg-gray-50 py-14">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Create New Recipe
          </h1>
          <p className="mt-2 text-gray-500">
            Your recipe will be saved as a draft.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-8 bg-white border border-gray-200 shadow-sm rounded-2xl"
        >
          {error && (
            <div className="px-4 py-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Classic Margherita Pizza"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Ingredients *
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                + Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      updateIngredient(index, 'name', e.target.value)
                    }
                    placeholder="Ingredient name"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50"
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(index, 'quantity', e.target.value)
                    }
                    placeholder="Quantity"
                    className="w-40 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-lg text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>

            <div className="overflow-hidden border border-gray-200 rounded-xl bg-gray-50">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full py-3 font-semibold text-white transition rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
}
