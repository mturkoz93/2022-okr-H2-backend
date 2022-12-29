import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { AppModule } from './app/app.module';
import { RolesGuard } from './app/guard/roles.guard';


export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('global MIDDLEWARE');

  next();
}

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(globalMiddleware);
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('2022-okr-H2')
    .setDescription('The 2022-okr-H2 API description')
    .setVersion('1.0')
    .addTag('2022-okr-H2')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const server = await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(
      `Swagger is running you can visit http://localhost:${PORT}/api to see the Swagger interface.\n\n`,
    );
  });

  /* SocketService.CreateSocketServer(server)
  SocketService.onConnect() */

  /* const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('socket bağlandı')
    socket.emit('hello', 'hoş geldin :)')
    socket.on('message', (msg) => {
      console.log('socket working at the backend', msg);
      io.sockets.emit('message', msg);
    });
  }); */
}

bootstrap();
