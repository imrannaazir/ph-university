import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1] as string,
    message: `${issue.path[issue.path.length - 1]} is ${issue.message}`,
  }));

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: `${config.NODE_ENV === 'development' && 'Zod'} Validation Error.`,
    errorSources,
  };
};

export default handleZodError;
