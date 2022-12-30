import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DomainNames } from '../enums/22OKRH2.enum';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('logger ' + DomainNames.MIDDLEWARE);
    next();
  }
}
