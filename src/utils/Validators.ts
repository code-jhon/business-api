import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

// Utility validators
export const validateFein = (fein: string): E.Either<Error, string> => {
  const isValid = /^\d{9}$/.test(fein);
  return isValid ? E.right(fein) : E.left(new Error('Invalid FEIN'));
};

export const validatePhoneNumber = (phone: string): E.Either<Error, string> => {
  const isValid = /^\+\d{1,3}\s?\d{1,14}(\s?\d{1,13})?$/.test(phone);
  return isValid ? E.right(phone) : E.left(new Error('Invalid phone number'));
};
