import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  login(payload: LoginAuthDto) {
    return {
      ...payload,
    };
  }
}
