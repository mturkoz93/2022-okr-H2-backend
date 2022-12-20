import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('2022-okr-H2')
    .setDescription('The 2022-okr-H2 API description')
    .setVersion('1.0')
    .addTag('2022-okr-H2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`Swagger is running you can visit http://localhost:${PORT}/api to see the Swagger interface.`)
  })
}
bootstrap();
