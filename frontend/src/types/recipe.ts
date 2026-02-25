// Ingredient used when creating a recipe
export interface IngredientInput {
  name: string;
  quantity: string;
}

// Matches backend Recipe.status enum
export type RecipeStatus = 'DRAFT' | 'PUBLISHED';

// Payload shape for POST /api/recipes
export interface CreateRecipePayload {
  title: string;
  description: {
    content: string; // matches backend Json field
  };
  categoryId: string;
  ingredients: IngredientInput[];
}
