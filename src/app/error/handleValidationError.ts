import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from './error.interface';

const handleValidationError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: string[] = err.issues?.map((issue: ZodIssue): string => {
    return `${issue?.path[issue?.path?.length - 1]} is ${issue?.message}` || '';
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorMessages?.join('. '),
  };
};
export default handleValidationError;
