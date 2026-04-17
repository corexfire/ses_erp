import type { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { AuthUser } from './auth.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto, reply: FastifyReply): Promise<{
        user: {
            id: string;
            tenantId: string;
            email: string;
            isSuperAdmin: boolean;
            name: string | null;
        };
        permissions: string[];
    }>;
    logout(reply: FastifyReply): {
        ok: boolean;
    };
    me(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        user: AuthUser;
        permissions: string[];
    }>;
}
