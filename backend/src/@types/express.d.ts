import type { AuthUser } from '../auth/auth.types';

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

declare module 'express' {
  interface Request {
    user: AuthUser;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthUser;
  }
}
