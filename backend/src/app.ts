import express from 'express';
import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './recipes/recipe.routes';
import ingredientRoutes from './routes/ingredient.routes';
import categoryRoutes from './routes/category.routes';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api/auth', authRoutes);

app.use('/api/categories', categoryRoutes);
app.use('/api/recipes', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);

app.use('/api/users', userRoutes);

export default app;
