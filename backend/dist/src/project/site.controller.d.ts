import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateDailyReportDto {
    projectId: string;
    reportDate: string;
    morningWeather?: string;
    afternoonWeather?: string;
    eveningWeather?: string;
    manpowerSummary?: string;
    equipmentSummary?: string;
    materialSummary?: string;
    workSummary?: string;
    progressPercent?: number;
    issues?: string;
    status?: string;
    wbsTaskId?: string;
}
export declare class SiteController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listSites(req: FastifyRequest & {
        user: AuthUser;
    }, search?: string, status?: string): Promise<{
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
                customerId: string | null;
                status: string;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            issues: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            submittedBy: string | null;
            projectId: string;
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
    createSite(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDailyReportDto): Promise<{
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        projectId: string;
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
    updateSite(id: string, body: Partial<CreateDailyReportDto>, req: FastifyRequest & {
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        projectId: string;
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
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<{
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
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            issues: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            submittedBy: string | null;
            projectId: string;
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
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDailyReportDto): Promise<{
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        projectId: string;
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
    get(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        projectId: string;
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
    }) | null>;
    update(id: string, body: Partial<CreateDailyReportDto>, req: FastifyRequest & {
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        issues: string | null;
        approvedBy: string | null;
        approvedAt: Date | null;
        submittedBy: string | null;
        projectId: string;
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
    addResource(id: string, body: {
        resourceType: string;
        quantity: number;
        unit?: string;
        notes?: string;
    }, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        resourceType: string;
        quantity: number;
        unit: string | null;
        dailyReportId: string;
    }>;
    removeResource(id: string, resourceId: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        success: boolean;
    }>;
    addPhoto(id: string, body: {
        fileId: string;
        description?: string;
    }, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getProgress(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: {
            reportDate: Date;
            workSummary: string | null;
        }[];
    }>;
}
