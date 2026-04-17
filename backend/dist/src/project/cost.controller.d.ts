import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateCommitmentDto {
    projectId: string;
    wbsTaskId?: string;
    commitmentType: string;
    referenceId?: string;
    description: string;
    amount: number;
}
export declare class CostController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listCosts(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<{
        data: {
            id: string;
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
                customerId: string | null;
                status: string;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
            wbsTask: {
                id: string;
                taskName: string;
                taskCode: string;
            };
            budget: number;
            actual: number;
            commitment: number;
            status: string;
            variance: number;
            percentUsed: number;
        }[];
    }>;
    getCostSummary(projectId: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        project: {
            wbsTasks: ({
                commitments: {
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    description: string | null;
                    status: string;
                    amount: import("@prisma/client-runtime-utils").Decimal;
                    referenceId: string | null;
                    projectId: string;
                    wbsTaskId: string | null;
                    commitmentType: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string | null;
                priority: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                actualCost: import("@prisma/client-runtime-utils").Decimal | null;
                teamId: string | null;
                level: number;
                projectId: string;
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
            })[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            startDate: Date | null;
            endDate: Date | null;
            customerId: string | null;
            status: string;
            contractId: string | null;
            totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
            retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
            downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
            dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
            billingType: string;
        };
        summary: {
            totalBudget: number;
            totalCommitted: number;
            totalActual: number;
            totalCost: number;
            variance: number;
            percentUsed: number;
            byType: Record<string, number>;
        };
    }>;
    getCostDetail(projectId: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceId: string | null;
            projectId: string;
            wbsTaskId: string | null;
            commitmentType: string;
        }[];
    }>;
    listCommitments(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceId: string | null;
            projectId: string;
            wbsTaskId: string | null;
            commitmentType: string;
        }[];
    }>;
    createCommitment(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCommitmentDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        referenceId: string | null;
        projectId: string;
        wbsTaskId: string | null;
        commitmentType: string;
    }>;
    getVariance(projectId: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        projectId: string;
        totalBudget: number;
        totalCommitted: number;
        available: number;
        percentUsed: number;
        budgetByTask: {
            taskCode: string | undefined;
            allocated: number;
            committed: number;
        }[];
    }>;
}
