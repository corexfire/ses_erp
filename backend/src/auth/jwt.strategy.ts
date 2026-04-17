import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { FastifyRequest } from 'fastify';
import type { JwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const cookieName =
      configService.get<string>('COOKIE_NAME') ?? 'ses_erp_access';

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: FastifyRequest) =>
          (req as FastifyRequest & { cookies?: Record<string, string> })
            .cookies?.[cookieName],
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? 'CHANGE_ME_DEV_ONLY',
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      tenantId: payload.tenantId,
      email: payload.email,
      isSuperAdmin: payload.isSuperAdmin,
    };
  }
}
