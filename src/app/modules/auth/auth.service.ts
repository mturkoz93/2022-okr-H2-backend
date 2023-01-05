import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDocument } from '../../models/tokens.model';
import { UserDocument } from 'src/app/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel('token') private readonly tokenModel: Model<TokenDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ username });

    /* if (!user) {
      throw new NotAcceptableException('could not find the user');
    } */
    if (!user) {
      throw new NotFoundException("Böyle bir kullanıcı bulunamadı");
      // return null
    };

    const passwordValid = await bcrypt.compare(password, user.password);


    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    try {
      // Payload
      const payload = { username: user.username, _id: user._id };

      // JWT sign method
      const accessToken = this.jwtService.sign(payload)

      // Create Token
      const createdToken = await this.tokenModel.create({
        user_id: user._id,
        accessToken: accessToken
      })

      // Update User
      await this.userModel.findByIdAndUpdate({ _id: user._id }, {
        $push: { tokens: createdToken._id }
      }, { new: true })


      return {
        user: payload,
        accessToken,
      };
    } catch (error) {
      throw new Error("hoop");
      
    }
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
