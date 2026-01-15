import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { env } from '../config/env';
import { ApiResponse } from '../types/api';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    const response: ApiResponse = {
      success: false,
      error: err.message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    return res.status(err.statusCode).json(response);
  }

  console.error('Unhandled error:', err);

  const response: ApiResponse = {
    success: false,
    error:
      env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };
  return res.status(500).json(response);
}
