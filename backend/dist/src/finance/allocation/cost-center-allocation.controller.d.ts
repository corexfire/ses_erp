import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class CostCenterAllocationController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, periodId?: string): Promise<{
        allocations: ({
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            accountCode: string;
            costCenterId: string;
            referenceNo: string | null;
            periodId: string;
            allocatedAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        allocation: ({
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            accountCode: string;
            costCenterId: string;
            referenceNo: string | null;
            periodId: string;
            allocatedAmount: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        periodId: string;
        costCenterId: string;
        accountCode: string;
        allocatedAmount: number;
        referenceNo?: string;
        description?: string;
    }): Promise<{
        allocation: {
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            accountCode: string;
            costCenterId: string;
            referenceNo: string | null;
            periodId: string;
            allocatedAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        allocatedAmount?: number;
        accountCode?: string;
        referenceNo?: string;
        description?: string;
    }): Promise<{
        allocation: {
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            accountCode: string;
            costCenterId: string;
            referenceNo: string | null;
            periodId: string;
            allocatedAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
