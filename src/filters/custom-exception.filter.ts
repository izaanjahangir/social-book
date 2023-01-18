import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ICustomException {
  getStatus(): number;
  message: string;
  response?: {
    message: string | [string];
  };
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: ICustomException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const message = Array.isArray(exception?.response?.message)
      ? exception?.response.message[0]
      : exception.message;

    const httpStatus =
      'getStatus' in exception
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      success: false,
      message: message,
      data: {},
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
