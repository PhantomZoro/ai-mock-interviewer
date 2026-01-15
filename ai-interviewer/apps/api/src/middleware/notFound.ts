import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(ApiError.notFound(`Route ${req.method} ${req.path} not found`));
}
