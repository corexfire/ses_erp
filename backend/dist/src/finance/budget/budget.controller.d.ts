import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class BudgetController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, fiscalYear?: number): Promise<{
        budgets: ({
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
        } & {
            fiscalYear: number;
            id: string;
            tenantId: string;
            createdAt: Date;
            periodNo: number | null;
            accountCode: string;
            costCenterId: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            budgetNo: string;
            spentAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        budget: ({
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
        } & {
            fiscalYear: number;
            id: string;
            tenantId: string;
            createdAt: Date;
            periodNo: number | null;
            accountCode: string;
            costCenterId: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            budgetNo: string;
            spentAmount: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        budgetNo: string;
        fiscalYear: number;
        periodNo?: number;
        accountCode: string;
        costCenterId?: string;
        amount: number;
    }): Promise<{
        budget: {
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
        } & {
            fiscalYear: number;
            id: string;
            tenantId: string;
            createdAt: Date;
            periodNo: number | null;
            accountCode: string;
            costCenterId: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            budgetNo: string;
            spentAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        budget: {
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
        } & {
            fiscalYear: number;
            id: string;
            tenantId: string;
            createdAt: Date;
            periodNo: number | null;
            accountCode: string;
            costCenterId: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            budgetNo: string;
            spentAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        amount?: number;
        accountCode?: string;
    }): Promise<{
        budget: {
            costCenter: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
        } & {
            fiscalYear: number;
            id: string;
            tenantId: string;
            createdAt: Date;
            periodNo: number | null;
            accountCode: string;
            costCenterId: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            budgetNo: string;
            spentAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
