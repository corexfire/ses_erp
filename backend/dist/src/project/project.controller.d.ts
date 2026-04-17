import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateProjectDto {
    code: string;
    name: string;
    customerId?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    totalBudget?: number;
}
export declare class UpdateProjectDto {
    name?: string;
    customerId?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    totalBudget?: number;
    status?: string;
}
export declare class UpdateProjectBillingSetupDto {
    retentionRate?: number;
    downPaymentTotal?: number;
    dpRecoveryRate?: number;
    billingType?: 'PROGRESS' | 'MILESTONE';
}
export declare class CreateWbsTaskDto {
    projectId: string;
    taskCode: string;
    taskName: string;
    description?: string;
    priority?: string;
    parentTaskId?: string;
    assigneeId?: string;
    level: number;
    plannedWeight?: number;
    plannedCost?: number;
    startDate?: string;
    endDate?: string;
    taskType?: string;
    tags?: string;
    status?: string;
}
export declare class ProjectController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listProjects(req: FastifyRequest & {
        user: AuthUser;
    }, search?: string, status?: string): Promise<{
        data: ({
            customer: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                nik: string | null;
                taxAddress: string | null;
            } | null;
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
        })[];
    }>;
    getProject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        customer: {
            id: string;
            email: string | null;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            npwp: string | null;
            phone: string | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            province: string | null;
            postalCode: string | null;
            countryCode: string | null;
            updatedAt: Date;
            code: string;
            nik: string | null;
            taxAddress: string | null;
        } | null;
        budgets: {
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
        }[];
        wbsTasks: ({
            assignee: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
            } | null;
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProjectDto): Promise<{
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
    }>;
    update(id: string, body: UpdateProjectDto, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    close(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    updateBillingSetup(id: string, body: UpdateProjectBillingSetupDto, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    getProjectWbs(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        wbsTasks: {
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
        }[];
    }>;
    listWbs(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string, assigneeId?: string, teamId?: string): Promise<{
        data: ({
            assignee: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
            } | null;
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
    }>;
    createWbs(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateWbsTaskDto): Promise<{
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
    }>;
    updateWbs(id: string, body: Partial<CreateWbsTaskDto>, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    updateWbsStatus(id: string, status: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    listDeadlines(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: {
            OVERDUE: ({
                team: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                } | null;
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
                assignee: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                } | null;
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
            TODAY: ({
                team: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                } | null;
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
                assignee: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                } | null;
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
            THIS_WEEK: ({
                team: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                } | null;
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
                assignee: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                } | null;
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
            FUTURE: ({
                team: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                } | null;
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
                assignee: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                } | null;
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
        };
        all: ({
            team: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
            } | null;
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
            assignee: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
            } | null;
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
    }>;
}
