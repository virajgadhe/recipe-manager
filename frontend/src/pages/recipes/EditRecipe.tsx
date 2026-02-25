import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById } from '../../api/recipe.api';
import { useAuth } from '../../context/AuthContext';
import type { Recipe } from '../../types/recipe';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data = await getRecipeById(id);

        if (!user || data.authorId !== user.id) {
          navigate('/dashboard');
          return;
        }

        setRecipe(data);
      } catch {
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, user, navigate]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Recipe</h1>

        <p className="text-gray-500">Editing: {recipe.title}</p>
      </div>
    </div>
  );
}
