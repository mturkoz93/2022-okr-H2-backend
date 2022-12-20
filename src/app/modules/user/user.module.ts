import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMiddleware } from 'src/app/common/middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes(UserController);
  }
}
