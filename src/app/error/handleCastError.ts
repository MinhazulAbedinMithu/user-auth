import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from './error.interface';
import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: string = `${err.value} is not a valid ID!`;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: errorMessages,
  };
};
export default handleCastError;
