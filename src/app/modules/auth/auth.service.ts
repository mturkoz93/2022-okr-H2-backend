import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ username });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  login(user: any) {
    const payload = { username: user.username, _id: user._id };

    return {
      access_token: this.jwtService.sign(payload, {secret: "test"}),
    };
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
