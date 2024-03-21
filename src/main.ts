import { FastifyInstance } from 'fastify';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { proxy } from 'aws-serverless-fastify';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PaginationPipe } from './common/pipes/pagination.pipe';
import multipart from '@fastify/multipart';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyStatic from '@fastify/static';

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

const logger = new Logger('Bootstrap');

async function bootstrapServer(): Promise<NestApp> {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    const instance = app.getHttpAdapter().getInstance() as FastifyInstance;

    const configService = app.get(ConfigService);

    app.register(multipart, {
      addToBody: true,
    });

    app.register(fastifyStatic, {
      root: '/Users/nick/Contracting/api/dist/swagger-ui',
      prefix: '/static-docs/',
    });

    const config = new DocumentBuilder()
      .setTitle('RAES Mobile API')
      .setDescription(
        'A NestJS Fastify API deployed with Serverless for the RAES Mobile App.',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    global.swaggerDocument = document;

    app.useGlobalFilters(new HttpExceptionFilter());

    const corsOrigins = configService.get('CORS_ORIGIN')?.split(','); // Assuming comma separation
    if (corsOrigins?.length) {
      app.enableCors({
        origin: (origin, callback) => {
          if (corsOrigins?.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        allowedHeaders: 'Content-Type, Accept',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      });
    }

    app.useLogger(new Logger());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
      new PaginationPipe(),
    );

    console.log('About to init the app');
    await app.init();
    console.log('App successfully inited');
    return { app, instance };
  } catch (error) {
    logger.error('Failed to bootstrap the application', error);
    throw error; // Rethrow the error to ensure Lambda execution fails and the error is logged in CloudWatch
  }
}

const handler = async (event, context) => {
  try {
    const { instance } = await bootstrapServer();
    console.log('In handler, instance instantiated');
    const ret = await proxy(instance, event, context);
    console.log('In handler, proxy instantiated');
    return ret;
  } catch (error) {
    logger.error('Error in Lambda handler', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export { bootstrapServer, handler };
