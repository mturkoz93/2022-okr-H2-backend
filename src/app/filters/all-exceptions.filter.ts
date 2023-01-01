import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/minimal';

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

      try {
        sendErrorToSentry(err)
      } catch (error) {
        
      }
      
      const errorMessage = httpStatus === 500 ? 'Sunucu hatası!' : (message || error)
      // Log
      console.log(errorMessage)

      return response.status(httpStatus).json({
        statusCode: httpStatus,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      
      try {
        sendErrorToSentry(err)
      } catch (error) {
        
      }
      
      const errorMessage = httpStatus === 500 ? 'Sunucu hatası!' : err.message
      // Log
      console.log(errorMessage)

      return response.status(httpStatus).json({
        statusCode: httpStatus,
        message: errorMessage,
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

function sendErrorToSentry(err) {
  Sentry.captureException(err);
}