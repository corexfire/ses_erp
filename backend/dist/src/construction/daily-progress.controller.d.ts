import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateDailyProgressDto {
    projectId: string;
    reportDate: string;
    morningWeather?: string;
    afternoonWeather?: string;
    eveningWeather?: string;
    workSummary?: string;
    progressPercent?: number;
    issues?: string;
    status?: string;
    wbsTaskId?: string;
    resources?: any[];
    photos?: any[];
    subcontractors?: any[];
}
export declare class DailyProgressController {
    private prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string, status?: string, q?: string): Promise<{
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
            resources: {
                id: string;
                tenantId: string;
                createdAt: Date;
                notes: string | null;
                resourceType: string;
                quantity: number;
                unit: string | null;
                dailyReportId: string;
            }[];
            photos: {
                id: string;
                tenantId: string;
                createdAt: Date;
                category: string | null;
                fileId: string;
                dailyReportId: string;
                caption: string | null;
            }[];
            subcontractors: {
                id: string;
                tenantId: string;
                dailyReportId: string;
                subcontractorName: string;
                workerCount: number;
                workDescription: string;
                subcontractorId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            issues: string | null;
            projectId: string;
            approvedBy: string | null;
            approvedAt: Date | null;
            submittedBy: string | null;
            wbsTaskId: string | null;
            progressPercent: import("@prisma/client-runtime-utils").Decimal | null;
            reportDate: Date;
            morningWeather: string | null;
            afternoonWeather: string | null;
            eveningWeather: string | null;
            manpowerSummary: string | null;
            equipmentSummary: string | null;
            materialSummary: string | null;
            workSummary: string | null;
            safetySummary: string | null;
            incidentSummary: string | null;
            visitorSummary: string | null;
            ownerInstructions: string | null;
            siteManagerId: string | null;
            hseOfficerId: string | null;
            siteId: string | null;
        })[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        pending: number;
        avgProgress: string;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDailyProgressDto): Promise<{
        resources: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            resourceType: string;
            quantity: number;
            unit: string | null;
            dailyReportId: string;
        }[];
        photos: {
            id: string;
            tenantId: string;
            createdAt: Date;
            category: string | null;
            fileId: string;
            dailyReportId: string;
            caption: string | null;
        }[];
        subcontractors: {
            id: string;
            tenantId: string;
            dailyReportId: string;
            subcontractorName: string;
            workerCount: number;
            workDescription: string;
            subcontractorId: string | null;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        projectId: string;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        wbsTaskId: string | null;
        progressPercent: import("@prisma/client-runtime-utils").Decimal | null;
        reportDate: Date;
        morningWeather: string | null;
        afternoonWeather: string | null;
        eveningWeather: string | null;
        manpowerSummary: string | null;
        equipmentSummary: string | null;
        materialSummary: string | null;
        workSummary: string | null;
        safetySummary: string | null;
        incidentSummary: string | null;
        visitorSummary: string | null;
        ownerInstructions: string | null;
        siteManagerId: string | null;
        hseOfficerId: string | null;
        siteId: string | null;
    }>;
    update(id: string, body: Partial<CreateDailyProgressDto>, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        resources: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            resourceType: string;
            quantity: number;
            unit: string | null;
            dailyReportId: string;
        }[];
        photos: {
            id: string;
            tenantId: string;
            createdAt: Date;
            category: string | null;
            fileId: string;
            dailyReportId: string;
            caption: string | null;
        }[];
        subcontractors: {
            id: string;
            tenantId: string;
            dailyReportId: string;
            subcontractorName: string;
            workerCount: number;
            workDescription: string;
            subcontractorId: string | null;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        projectId: string;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        wbsTaskId: string | null;
        progressPercent: import("@prisma/client-runtime-utils").Decimal | null;
        reportDate: Date;
        morningWeather: string | null;
        afternoonWeather: string | null;
        eveningWeather: string | null;
        manpowerSummary: string | null;
        equipmentSummary: string | null;
        materialSummary: string | null;
        workSummary: string | null;
        safetySummary: string | null;
        incidentSummary: string | null;
        visitorSummary: string | null;
        ownerInstructions: string | null;
        siteManagerId: string | null;
        hseOfficerId: string | null;
        siteId: string | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
