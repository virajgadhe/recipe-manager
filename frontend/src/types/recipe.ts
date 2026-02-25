// Ingredient used when creating a recipe
export interface IngredientInput {
  name: string;
  quantity: string;
}

// Full ingredient returned from backend
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
  description: string;
  status: RecipeStatus;
  authorId: string;
  categoryId: string;
  category: RecipeCategory;
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt?: string;
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
  description?: string;
  categoryId?: string;
  ingredients?: IngredientInput[];
}
