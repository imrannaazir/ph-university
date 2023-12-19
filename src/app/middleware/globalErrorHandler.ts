/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const errorMessage = error.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error,
  });
};

export default globalErrorHandler;
