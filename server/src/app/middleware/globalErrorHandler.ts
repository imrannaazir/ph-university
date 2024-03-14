/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import config from '../config'
import handleMongooseValidationError from '../errors/handleMongooseValidationError'
import handleDuplicateKeyError from '../errors/handleDuplicateKeyError'
import handleCastError from '../errors/handleCastError'
import AppError from '../errors/AppError'
import handleAppError from '../errors/handleAppError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  let message = 'Internal server error'
  let errorSources = null

  // handle duplicate key error.
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // handle mongoose validation error
  else if (error.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // handle duplicate key error
  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateKeyError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // handle cast error
  else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // handle custom AppError
  else if (error instanceof AppError) {
    const simplifiedError = handleAppError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  })
}

export default globalErrorHandler
