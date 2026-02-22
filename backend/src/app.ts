import express from 'express';
import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './recipes/recipe.routes';
import ingredientRoutes from './routes/ingredient.routes';
import categoryRoutes from './routes/category.routes';

const app = express();
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api/auth', authRoutes);

app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/recipes', ingredientRoutes);

export default app;
