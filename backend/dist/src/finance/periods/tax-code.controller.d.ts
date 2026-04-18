import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class TaxCodeController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        taxCodes: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        code: string;
        name: string;
        rate: number;
        effectiveDate: string;
    }): Promise<{
        taxCode: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        };
    }>;
    update(id: string, body: {
        name?: string;
        rate?: number;
        isActive?: boolean;
    }): Promise<{
        taxCode: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
