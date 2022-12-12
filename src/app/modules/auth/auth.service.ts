import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';

@Injectable()
export class AuthService {
  login(payload: LoginAuthDto) {
    return 'This is login';
  }

  logout(payload: LogoutAuthDto) {
    return 'This is logout';
  }

  register(payload: RegisterAuthDto) {
    return 'This is register';
  }

  resetPassword(payload: ResetPasswordAuthDto) {
    return 'This is resetPassword';
  }
}
