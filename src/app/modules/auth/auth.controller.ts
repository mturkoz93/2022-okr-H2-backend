import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';
import { AuthenticatedGuard } from './authenticated.guard';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // Kimlik doğrulamasını zorunlu kılmak için UseGuards kullanıldı
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getHello(@Request() req: any) {
    return req.user;
  }

  @Post('logout')
  logout(@Body() payload: LogoutAuthDto) {
    return this.authService.logout(payload);
  }

  @Post('signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ) {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
  /* @Post('signup')
  createUser(@Body(AuthPipe) payload: RegisterAuthDto) {
    console.log('controller', payload)
    return this.authService.register(payload);
  } */

  @Post('reset-password')
  resetPassword(@Body() payload: ResetPasswordAuthDto) {
    return this.authService.resetPassword(payload);
  }
}
