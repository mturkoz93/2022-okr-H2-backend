import { RoomService } from './modules/room/room.service';
import { ChatGateway } from './gateways/chat.gateway';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/app/common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagModule } from './modules/tag/tag.module';
import { RoomModule } from './modules/room/room.module';
import configuration from './config/configuration';
import { UserSchema } from './models/users.model';
import { RoomSchema } from './models/room.model';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SentryModule } from '@ntegral/nestjs-sentry';
const SENTRY_DSN = "https://1ab0a5e19db64b02a66a929298bee953@o4504431183855616.ingest.sentry.io/4504431276654593"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'room', schema: RoomSchema },
    ]),
    SentryModule.forRoot({
      dsn: `${SENTRY_DSN}`,
      debug: true,
      environment: process.env.NODE_ENV,
      release: null, // must create a release in sentry.io dashboard
      // logLevel: LogLevel.Debug //based on sentry.io loglevel //
    }),
    AdminModule,
    UserModule,
    AuthModule,
    TagModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RoomService,
    ChatGateway,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
