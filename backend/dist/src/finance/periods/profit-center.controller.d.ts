import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ProfitCenterController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        profitCenters: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        code: string;
        name: string;
    }): Promise<{
        profitCenter: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    update(id: string, body: {
        name?: string;
        isActive?: boolean;
    }): Promise<{
        profitCenter: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
