import express from 'express';
import cors from 'cors';

import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './recipes/recipe.routes';
import ingredientRoutes from './routes/ingredient.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import likeRoutes from './routes/like.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

// health
app.use('/api', healthRoute);

// auth
app.use('/api/auth', authRoutes);

// categories (public)
app.use('/api/categories', categoryRoutes);

// recipes
app.use('/api/recipes', recipeRoutes);

// nested recipe resources (ingredients)
app.use('/api/recipes', ingredientRoutes);

app.use('/api', likeRoutes);

// user profile
app.use('/api/users', userRoutes);

export default app;
