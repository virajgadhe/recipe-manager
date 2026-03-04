import express from 'express';
import cors from 'cors';

import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './recipes/recipe.routes';
import ingredientRoutes from './routes/ingredient.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import likeRoutes from './routes/like.routes';
import path from 'path';

const app = express();

app.use(
  cors({
    origin: true,
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

/* Serve frontend */

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');

  app.use(express.static(frontendPath));

  app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}
export default app;
