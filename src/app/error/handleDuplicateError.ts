import { TGenericErrorResponse } from './error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessage: string = `Duplicate ${err?.keyPattern[0]} key`;

  return {
    statusCode,
    message: 'Duplicate Error!',
    errorMessage,
  };
};

export default handleDuplicateError;
