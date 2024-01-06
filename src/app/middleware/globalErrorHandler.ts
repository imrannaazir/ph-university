/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';
  let errorMessage = error.message || 'Something went wrong!';

  // handle duplicate key error.
  if (error.code === 1100) {
  }

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error,
  });
};

export default globalErrorHandler;
