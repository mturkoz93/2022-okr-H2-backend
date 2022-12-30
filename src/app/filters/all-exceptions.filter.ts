import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const err: HttpException | Error = exception;

    if (err instanceof HttpException) {
      const errResponse: string | any = err.getResponse();
      const { message, error } = errResponse instanceof Object ? errResponse : { message: errResponse, error: null };

      // Log
      console.log(message || error)

      return response.status(httpStatus).json({
        statusCode: httpStatus,
        message: message || error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      console.log(err.message)
      return response.status(httpStatus).json({
        statusCode: httpStatus,
        message: err.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    /* response
      .status(status)
      .json({
        statusCode: status,
        message:
        timestamp: new Date().toISOString(),
        path: request.url,
      }); */
  }
}