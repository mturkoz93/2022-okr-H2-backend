import { Jwt } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import { CanActivate, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class WsGuard implements CanActivate {

  constructor(private userService: UserService, private jwtService: JwtService,) {
  }

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    try {
      const bearerToken = context.args[0].handshake.query.accessToken || null;
      // const decoded = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2vEsSIsIl9pZCI6IjYzYWJhYjAzMzk2ZGY4MzQxOGRmMmZlYyIsImlhdCI6MTY3MjI5OTY3NSwiZXhwIjoxNjc3NDgzNjc1fQ.k0asy3AfhhZChvHNHdDQlj4TPFDCD6XJDgSQaTBUMVc", process.env.JWT_PUBLIC_KEY) as any;
      const decoded = this.jwtService.verify(bearerToken)

      return new Promise((resolve, reject) => {
        
        if(!decoded) {
          reject(false)
        }

        return this.userService.findOne(decoded._id).then(user => {
          if (user) {
            context.args[0]["user"] = user
            resolve(user);
          } else {
            reject(false);
          }
        });

      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
