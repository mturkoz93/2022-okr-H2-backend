import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/app/common/middleware/logger.middleware';
import { UserMiddleware } from 'src/app/common/middleware/user.middleware';
import { AdminController } from './modules/admin/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './modules/cat/cat.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, CatController, AdminController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, UserMiddleware)
      .forRoutes('*');
  }
}
