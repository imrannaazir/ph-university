import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid Object Id.',
    errorSources: [
      {
        path: error.path,
        message: error.message,
      },
    ],
  };
};

export default handleCastError;
