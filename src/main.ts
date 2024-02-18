import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.port || 'localhost:4000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Apis Swagger')
    .setDescription('All apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {

  });

  SwaggerModule.setup('api/', app, document);
  await app.listen(port, () => {
    console.log(`Server in http://localhost:${port}`);
  });
}
bootstrap();
