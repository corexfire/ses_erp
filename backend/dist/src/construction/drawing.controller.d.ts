import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateDrawingDto {
    projectId: string;
    wbsTaskId?: string;
    code: string;
    title: string;
    category?: string;
    discipline?: string;
    revision?: string;
    revisionDate?: string;
    status?: string;
    fileId?: string;
}
export declare class DrawingController {
    private prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string, discipline?: string, q?: string): Promise<{
        data: ({
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
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            title: string;
            category: string | null;
            projectId: string;
            fileId: string | null;
            wbsTaskId: string | null;
            discipline: string | null;
            revision: string;
            revisionDate: Date | null;
        })[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        pending: number;
        structural: number;
        arch: number;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDrawingDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        title: string;
        category: string | null;
        projectId: string;
        fileId: string | null;
        wbsTaskId: string | null;
        discipline: string | null;
        revision: string;
        revisionDate: Date | null;
    }>;
    update(id: string, body: Partial<CreateDrawingDto>): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        title: string;
        category: string | null;
        projectId: string;
        fileId: string | null;
        wbsTaskId: string | null;
        discipline: string | null;
        revision: string;
        revisionDate: Date | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
