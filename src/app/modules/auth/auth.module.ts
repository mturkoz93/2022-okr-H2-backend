import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/users.model';
import { UserService } from '../user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenSchema } from '../../models/tokens.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }, { name: 'token', schema: TokenSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '60d' },
          secret: configService.get<string>('JWT_PUBLIC_KEY')
        };
      },
      inject: [ConfigService]
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, JwtStrategy, PassportModule]
})
export class AuthModule {}
