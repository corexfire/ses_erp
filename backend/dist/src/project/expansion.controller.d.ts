import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectExpansionController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getGanttData(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        tasks: any[];
    }>;
    private calculateCriticalPath;
    createDependency(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        dependency: {
            id: string;
            tenantId: string;
            createdAt: Date;
            dependencyType: string;
            lag: number;
            predecessorId: string;
            successorId: string;
        };
    }>;
    getIssues(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        issues: ({
            assignee: {
                name: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            type: string;
            status: string;
            assignedToId: string | null;
            dueDate: Date | null;
            title: string;
            severity: string;
            projectId: string;
            resolvedAt: Date | null;
        })[];
    }>;
    createIssue(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string, body: any): Promise<{
        issue: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            type: string;
            status: string;
            assignedToId: string | null;
            dueDate: Date | null;
            title: string;
            severity: string;
            projectId: string;
            resolvedAt: Date | null;
        };
    }>;
    getChangeOrders(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        changeOrders: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            title: string;
            projectId: string;
            approvedById: string | null;
            approvedAt: Date | null;
            orderNo: string;
            amountChange: import("@prisma/client-runtime-utils").Decimal;
            scheduleImpact: number;
        }[];
    }>;
    createCO(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string, body: any): Promise<{
        changeOrder: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            title: string;
            projectId: string;
            approvedById: string | null;
            approvedAt: Date | null;
            orderNo: string;
            amountChange: import("@prisma/client-runtime-utils").Decimal;
            scheduleImpact: number;
        };
    }>;
    getHealthStats(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        error: string;
        financials?: undefined;
        progress?: undefined;
        risks?: undefined;
    } | {
        financials: {
            originalBudget: number;
            coApproved: number;
            currentBudget: number;
        };
        progress: {
            planned: number;
            actual: number;
        };
        risks: {
            severity: string;
            count: number;
        }[];
        error?: undefined;
    }>;
}
