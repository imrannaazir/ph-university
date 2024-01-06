import { TGenericErrorResponse } from '../interface/error';
import AppError from './AppError';

const handleAppError = (error: AppError): TGenericErrorResponse => {
  return {
    statusCode: error.statusCode,
    message: 'App Error.',
    errorSources: [
      {
        path: '',
        message: error.message,
      },
    ],
  };
};

export default handleAppError;
