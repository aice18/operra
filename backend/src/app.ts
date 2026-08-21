import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Setup Swagger Docs
setupSwagger(app);

// API Routes
app.use('/api', apiRouter);

// Basic Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
