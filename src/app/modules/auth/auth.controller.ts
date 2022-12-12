import { AuthPipe } from './pipe/auth.pipe';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  @Post('logout')
  logout(@Body() payload: LogoutAuthDto) {
    return this.authService.logout(payload);
  }

  @Post('register')
  register(@Body(AuthPipe) payload: RegisterAuthDto) {
    console.log('controller', payload)
    return this.authService.register(payload);
  }

  @Post('reset-password')
  resetPassword(@Body() payload: ResetPasswordAuthDto) {
    return this.authService.resetPassword(payload);
  }
}
