import { AppError } from './app.error';
import { ErrorKind } from './error-kind';

export class ValidationError extends AppError {
  constructor(code: string, message: string) {
    super(ErrorKind.VALIDATION, code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(ErrorKind.NOT_FOUND, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(ErrorKind.CONFLICT, code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: string, message: string) {
    super(ErrorKind.UNAUTHORIZED, code, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: string, message: string) {
    super(ErrorKind.FORBIDDEN, code, message);
  }
}
