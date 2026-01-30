import { Request, Response, NextFunction } from 'express';

// Custom error interface
export interface CustomError extends Error {
  status?: number;
  statusCode?: number;
}

// Error handling middleware
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
};

// Not found handler
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not found - ${req.originalUrl}`) as CustomError;
  error.status = 404;
  next(error);
};
