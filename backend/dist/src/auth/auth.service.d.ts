import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        tenantId: string;
        email: string;
        isSuperAdmin: boolean;
        name: string | null;
    }>;
    createAccessToken(user: {
        id: string;
        tenantId: string;
        email: string;
        isSuperAdmin: boolean;
    }): Promise<string>;
    getUserPermissions(input: {
        userId: string;
        isSuperAdmin: boolean;
    }): Promise<string[]>;
    getCookieName(): string;
}
