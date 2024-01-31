import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSource[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val.path,
      message: val.message,
    })
  );
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: `${config.NODE_ENV && 'Mongoose'} Validation Error.`,
    errorSources,
  };
};

export default handleMongooseValidationError;
