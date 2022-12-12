import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}
bootstrap();
