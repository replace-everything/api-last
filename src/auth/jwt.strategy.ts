// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Global, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Global()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authHeader = (request.headers.authorization ||
            request.headers.Authorization) as string;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.slice(7, authHeader.length);
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    console.log('VALIDATE STRATEGY', payload);
    return {
      userId: payload.sub,
      username: payload.username,
      schema: payload.dbSchema,
    };
  }
}
