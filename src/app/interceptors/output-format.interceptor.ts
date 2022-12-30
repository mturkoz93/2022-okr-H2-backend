import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OutputFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next
      .handle()
      .pipe(
        map((res) => {
          return {
            statusCode: 200,
            message: 'success',
            timestamp: new Date().toISOString(),
            path: request.url,
            success: true,
            data: res ? res : null,
          };
        }),
      );
  }
}