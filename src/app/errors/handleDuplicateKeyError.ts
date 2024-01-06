/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateKeyError = (error: any): TGenericErrorResponse => {
  const path = Object.keys(error.keyValue)[0];
  const errorSources: TErrorSource[] = [
    {
      path,
      message: `'${error.keyValue[path]}' already exist in path '${path}'`,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Duplicate key error.',
    errorSources,
  };
};

export default handleDuplicateKeyError;
