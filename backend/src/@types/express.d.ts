import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: import('../auth/auth.types').AuthUser;
  }
}
