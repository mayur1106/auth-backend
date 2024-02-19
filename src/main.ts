import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/exception.filter';
import { Logger } from 'nestjs-pino';
async function bootstrap() {
  const whiteList = ['http://localhost:3000'];

  const options = {
    origin: process.env.NODE_ENV == 'prod' ? whiteList : whiteList,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders:
      'Content-Type,Accept,Authorization,email,x-request-id,request-type,X-Service-Identifier',
    exposedHeaders: 'X-Service-Identifier',
  };
  const app = await NestFactory.create(AppModule, { cors: options });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(options);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Auth Apis')
    .setDescription('Auth API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addSecurity('token', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(
    configService.get('PORT'),
    () => `Server Started on ${configService.get('PORT')}`,
  );
}
bootstrap();
