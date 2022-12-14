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
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupDTO } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // Kimlik doğrulamasını zorunlu kılmak için UseGuards kullanıldı
  @Post('login')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('local'))
  login(@Request() req: any, @Body() payload: LoginDTO) {
    console.log(payload)
    return this.authService.login(req.user);
  }

  @Get('hello')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getHello(@Request() req: any) {
    return {
      user: req.user,
      message: 'Hello Mello.. :)'
    };
  }

  @Post('logout')
  logout(@Body() payload: LogoutAuthDto) {
    return this.authService.logout(payload);
  }

  @Post('signup')
  async createUser(
    @Body() payload: SignupDTO,
  ) {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, saltOrRounds);
    const result = await this.usersService.createUser({ ...payload, password: hashedPassword });
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
