import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoutesMiddleware implements NestMiddleware {
  constructor(private reflector: Reflector) {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const routes = this.reflector.get<string[]>('__routes__', 'metadataKey');
    console.log(routes);
    next();
  }
}
