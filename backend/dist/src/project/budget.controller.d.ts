import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class BudgetLineDto {
    id?: string;
    wbsTaskId?: string;
    costCategory: string;
    description: string;
    unitPrice: number;
    qty: number;
    uom?: string;
}
declare class CreateProjectBudgetDto {
    projectId: string;
    budgetNo: string;
    description?: string;
    lines: BudgetLineDto[];
}
export declare class ProjectBudgetController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listBudgets(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<({
        project: {
            name: string;
            code: string;
        };
        _count: {
            lines: number;
        };
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    })[]>;
    getBudget(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
        project: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            startDate: Date | null;
            endDate: Date | null;
            status: string;
            customerId: string | null;
            contractId: string | null;
            totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
            retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
            downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
            dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
            billingType: string;
        };
        lines: ({
            wbsTask: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string | null;
                priority: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                actualCost: import("@prisma/client-runtime-utils").Decimal | null;
                projectId: string;
                teamId: string | null;
                level: number;
                taskCode: string;
                taskName: string;
                parentTaskId: string | null;
                assigneeId: string | null;
                plannedWeight: number;
                plannedCost: import("@prisma/client-runtime-utils").Decimal | null;
                actualProgress: number | null;
                taskType: string;
                tags: string | null;
                categoryId: string | null;
            } | null;
        } & {
            uom: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            qty: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            costCategory: string;
            wbsTaskId: string | null;
            budgetId: string;
        })[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    }) | null>;
    createBudget(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProjectBudgetDto): Promise<{
        lines: {
            uom: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            qty: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            costCategory: string;
            wbsTaskId: string | null;
            budgetId: string;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    updateBudget(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateProjectBudgetDto>): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    updateStatus(id: string, status: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    deleteBudget(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        budgetNo: string;
        projectId: string;
        wbsTaskId: string | null;
        revNo: number;
        allocatedBudget: import("@prisma/client-runtime-utils").Decimal;
        committedAmount: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
}
export {};
