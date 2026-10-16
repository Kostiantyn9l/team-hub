import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

import { AppError } from '@/shared/errors/app.error';
import { ErrorKind } from '@/shared/errors/error-kind';

const STATUS_BY_KIND: Record<ErrorKind, HttpStatus> = {
  [ErrorKind.VALIDATION]: HttpStatus.BAD_REQUEST,
  [ErrorKind.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorKind.CONFLICT]: HttpStatus.CONFLICT,
  [ErrorKind.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ErrorKind.FORBIDDEN]: HttpStatus.FORBIDDEN,
};

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof AppError) {
      const status = STATUS_BY_KIND[exception.kind];
      response.status(status).json({
        statusCode: status,
        code: exception.code,
        message: exception.message,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message = getErrorMessage(exceptionResponse, exception.message);

      response.status(status).json({
        statusCode: status,
        code: `HTTP_${status}`,
        message,
      });

      return;
    }

    this.logger.error(
      'Unexpected server error',
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}

function getErrorMessage(
  exceptionResponse: string | object,
  fallbackMessage: string,
): string | string[] {
  if (typeof exceptionResponse === 'string') return exceptionResponse;

  if (
    'message' in exceptionResponse &&
    (typeof exceptionResponse.message === 'string' ||
      (Array.isArray(exceptionResponse.message) &&
        exceptionResponse.message.every(
          (item: unknown) => typeof item === 'string',
        )))
  ) {
    return exceptionResponse.message;
  }

  return fallbackMessage;
}
