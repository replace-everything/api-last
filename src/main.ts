// src/main.ts
import { FastifyInstance } from 'fastify';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { proxy } from 'aws-serverless-fastify';
import { PaginationPipe } from './common/pipes/pagination.pipe';
import multipart from '@fastify/multipart';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyStatic from '@fastify/static';
import 'reflect-metadata';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import path from 'path';
import { InternalServerError } from '@aws-sdk/client-dynamodb';

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedApp: NestApp | null = null;

async function bootstrapServer(): Promise<NestApp> {
  if (cachedApp) {
    return cachedApp;
  }
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    const instance = app.getHttpAdapter().getInstance() as FastifyInstance;
    app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
    try {
      // @ts-expect-error bad types
      app.register(multipart, {
        addToBody: true,
      });
    } catch (e) {
      console.log('Error in multipart', e);
    }
    try {
      const root = path.resolve(__dirname, '/api/dist/swagger-ui');
      // @ts-expect-error bad types
      app.register(fastifyStatic, {
        root: root,
        prefix: '/static-docs/',
      });
    } catch (e) {
      console.log('Error in fastifyStatic', e);
    }

    let config;
    try {
      config = new DocumentBuilder()
        .setTitle('RAES Mobile API')
        .setDescription(
          'A NestJS Fastify API deployed with Serverless for the RAES Mobile App.',
        )
        .setVersion('1.0')
        .build();
    } catch (e) {
      console.log('Error in DocumentBuilder', e);
    }

    let document;
    try {
      document = SwaggerModule.createDocument(app, config);
    } catch (e) {
      console.log('Error in SwaggerModule', e);
    }
    try {
      global.swaggerDocument = document;
    } catch (e) {
      console.log('Error in global.swaggerDocument', e);
    }
    // app.useGlobalFilters(new HttpExceptionFilter());
    try {
      console.log('CORS_ORIGIN', process.env.CORS_ORIGIN);
      const allowedOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['*'];

      app.enableCors({
        origin: allowedOrigins,
        allowedHeaders: 'Content-Type, Accept, x-database, Authorization',
        // allowedHeaders: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      });
    } catch (e) {
      console.log('Error setting CORS', e);
    }
    try {
      app.useLogger(new Logger());
    } catch (e) {
      console.log('Coul not register Logger');
    }
    try {
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
        new PaginationPipe(),
      );
    } catch (e) {
      console.log('Error setting up Global validation pipes:', e);
    }
    try {
      await app.init();
    } catch (e) {
      // @ts-expect-error that fucking stupid
      throw new InternalServerError(
        `Application faile to initialized: ${e.message}`,
      );
    }

    cachedApp = { app, instance };

    return cachedApp;
  } catch (error) {
    throw error; // Rethrow the error to ensure Lambda execution fails and the error is logged in CloudWatch
  }
}

const handler = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { instance } = await bootstrapServer();

    const ret = await proxy(instance, event, context, ['callback']);

    return ret;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export { bootstrapServer, handler };
