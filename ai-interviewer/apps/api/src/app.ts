import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { ApiResponse, HealthData } from './types/api';

export function createApp(): Express {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    })
  );

  // Request logging (skip in test)
  if (env.NODE_ENV !== 'test') {
    app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  }

  // Body parsing with size limits
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Health check
  app.get('/health', (_req, res) => {
    const response: ApiResponse<HealthData> = {
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
      },
    };
    res.json(response);
  });

  // 404 handler
  app.use(notFoundHandler);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
