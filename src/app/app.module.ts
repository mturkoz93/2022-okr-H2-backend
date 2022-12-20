import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/app/common/middleware/logger.middleware';
import { UserMiddleware } from 'src/app/common/middleware/user.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongo_username = "adesso"
const mongo_password = "okr2022"
const mongo_database_name = "chat_app"
const MONGO_URI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.izwr5.mongodb.net/${mongo_database_name}?retryWrites=true&w=majority`

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AdminModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
