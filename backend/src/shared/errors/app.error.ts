import { ErrorKind } from './error-kind';

export abstract class AppError extends Error {
  protected constructor(
    readonly kind: ErrorKind,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
