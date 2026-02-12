import express from 'express';
import healthRoute from './routes/health';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api', authRoutes);

export default app;
