import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
export declare class MarketplaceChannelController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        channels: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            iconUrl: string | null;
            apiEndpoint: string | null;
            clientId: string | null;
            clientSecret: string | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        name: string;
        code: string;
        type: string;
        iconUrl?: string;
        apiEndpoint?: string;
        clientId?: string;
        clientSecret?: string;
        isActive?: boolean;
    }): Promise<{
        channel: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            iconUrl: string | null;
            apiEndpoint: string | null;
            clientId: string | null;
            clientSecret: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: Partial<{
        name: string;
        code: string;
        type: string;
        iconUrl: string;
        apiEndpoint: string;
        clientId: string;
        clientSecret: string;
        isActive: boolean;
    }>): Promise<{
        channel: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            iconUrl: string | null;
            apiEndpoint: string | null;
            clientId: string | null;
            clientSecret: string | null;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    testConnection(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
