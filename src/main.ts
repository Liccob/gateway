import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './docs';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie = require('@fastify/cookie');
import { FastifyLogger } from './common/logger';
import fastify from 'fastify';
async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  // const logger = WinstonModule.createLogger(winstonConfig);
  // app.useLogger(logger);
  // app.useLogger(app.get(Logger));
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });

  await app.register(fastifyCookie, {
    secret: 'gateway-secret', // for cookies signature
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  generateDocument(app);

  await app.listen(3000);
}
bootstrap();
