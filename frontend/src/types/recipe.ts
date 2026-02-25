// Ingredient used when creating a recipe
export interface IngredientInput {
  name: string;
  quantity: string;
}

// Full ingredient when returned from backend
export interface Ingredient extends IngredientInput {
  id: string;
}

// Matches backend Recipe.status enum
export type RecipeStatus = 'DRAFT' | 'PUBLISHED';

// Category returned from backend
export interface RecipeCategory {
  id: string;
  name: string;
}

// Full Recipe object returned from API
export interface Recipe {
  id: string;
  title: string;
  description: {
    content: string;
  };
  status: RecipeStatus;
  category: RecipeCategory;
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt: string;
}

// Payload shape for POST /api/recipes
export interface CreateRecipePayload {
  title: string;
  description: string;
  categoryId: string;
  ingredients: IngredientInput[];
}

// Payload shape for update
export interface UpdateRecipePayload {
  title?: string;
  description?: {
    content: string;
  };
  categoryId?: string;
  ingredients?: IngredientInput[];
}
