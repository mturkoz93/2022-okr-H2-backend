import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/users.model';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy]
})
export class AuthModule {}
