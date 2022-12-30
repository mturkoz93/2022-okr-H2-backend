import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
            console.log('After...')
            console.log({ url: request.url, time: `${Date.now() - now}ms`})
        }),
      );
  }
}