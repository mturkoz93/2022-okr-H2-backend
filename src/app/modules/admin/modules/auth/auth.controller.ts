import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DomainNames } from 'src/app/common/enums/22OKRH2.enum';
import { RolesGuard } from 'src/app/guard/roles.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

const baseDomainUrl = DomainNames.ADMIN

@Controller(`${baseDomainUrl}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }
}
