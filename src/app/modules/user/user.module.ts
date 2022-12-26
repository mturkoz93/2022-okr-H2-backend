import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMiddleware } from 'src/app/common/middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/users.model';
import { TokenSchema } from '../../models/tokens.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }, { name: 'token', schema: TokenSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController);
  }
}
