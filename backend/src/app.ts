import express from 'express';
import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './recipes/recipe.routes';

const app = express();
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api/auth', authRoutes);

app.use('/api/recipes', recipeRoutes);

export default app;
