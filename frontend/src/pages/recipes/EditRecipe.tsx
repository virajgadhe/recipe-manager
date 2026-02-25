import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { getRecipeById, updateRecipe } from '../../api/recipe.api';
import { getCategories } from '../../api/public';
import { useAuth } from '../../context/AuthContext';
import type { Recipe, IngredientInput } from '../../types/recipe';

interface Category {
  id: string;
  name: string;
}

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[160px] focus:outline-none px-4 py-3 text-gray-700',
      },
    },
  });

  // 🔹 Fetch recipe + categories
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const recipe: Recipe = await getRecipeById(id);

        // Ownership validation
        if (!user || recipe.authorId !== user.id) {
          navigate('/dashboard');
          return;
        }

        const cats = await getCategories();

        setCategories(cats);
        setTitle(recipe.title);
        setCategoryId(recipe.categoryId);
        setIngredients(
          recipe.ingredients.map((ing) => ({
            name: ing.name,
            quantity: ing.quantity,
          })),
        );

        editor?.commands.setContent(recipe.description);
      } catch {
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, navigate, editor]);

  // 🔹 Ingredient handlers
  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const updateIngredient = (
    index: number,
    field: keyof IngredientInput,
    value: string,
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    );
  };

  // 🔹 Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError('');

    if (!title.trim() || !categoryId) {
      setError('Please fill in all required fields.');
      return;
    }

    const cleanedIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim(),
    );

    if (cleanedIngredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    try {
      setSaving(true);

      await updateRecipe(id, {
        title: title.trim(),
        categoryId,
        description: editor?.getHTML() ?? '',
        ingredients: cleanedIngredients,
      });

      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update recipe.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Recipe</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
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
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-indigo-600 text-sm"
              >
                + Add
              </button>
            </div>

            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(index, 'name', e.target.value)
                  }
                  placeholder="Name"
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2"
                />
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(index, 'quantity', e.target.value)
                  }
                  placeholder="Quantity"
                  className="w-36 rounded-xl border border-gray-200 px-4 py-2"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="rounded-xl border border-gray-200 bg-gray-50 mt-1">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
