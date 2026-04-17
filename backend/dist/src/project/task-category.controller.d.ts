import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class TaskCategoryController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: ({
            _count: {
                tasks: number;
            };
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            color: string | null;
            icon: string | null;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        code: string;
        name: string;
        description?: string;
        color?: string;
        icon?: string;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            color: string | null;
            icon: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        code?: string;
        name?: string;
        description?: string;
        color?: string;
        icon?: string;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            color: string | null;
            icon: string | null;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
