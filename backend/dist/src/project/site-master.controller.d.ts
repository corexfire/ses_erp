import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class CreateProjectSiteDto {
    projectId: string;
    siteCode: string;
    name: string;
    address?: string;
    city?: string;
    province?: string;
    gpsCoords?: string;
    contactName?: string;
    contactPhone?: string;
    status?: string;
}
export declare class ProjectSiteController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listSites(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<({
        project: {
            name: string;
            code: string;
        };
        _count: {
            dailyReports: number;
        };
    } & {
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        city: string | null;
        province: string | null;
        updatedAt: Date;
        status: string;
        projectId: string;
        contactName: string | null;
        address: string | null;
        siteCode: string;
        gpsCoords: string | null;
        contactPhone: string | null;
    })[]>;
    getSite(id: string, req: FastifyRequest & {
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
        dailyReports: {
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
        }[];
    } & {
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        city: string | null;
        province: string | null;
        updatedAt: Date;
        status: string;
        projectId: string;
        contactName: string | null;
        address: string | null;
        siteCode: string;
        gpsCoords: string | null;
        contactPhone: string | null;
    }) | null>;
    createSite(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProjectSiteDto): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        city: string | null;
        province: string | null;
        updatedAt: Date;
        status: string;
        projectId: string;
        contactName: string | null;
        address: string | null;
        siteCode: string;
        gpsCoords: string | null;
        contactPhone: string | null;
    }>;
    updateSite(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateProjectSiteDto>): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        city: string | null;
        province: string | null;
        updatedAt: Date;
        status: string;
        projectId: string;
        contactName: string | null;
        address: string | null;
        siteCode: string;
        gpsCoords: string | null;
        contactPhone: string | null;
    }>;
    deleteSite(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        city: string | null;
        province: string | null;
        updatedAt: Date;
        status: string;
        projectId: string;
        contactName: string | null;
        address: string | null;
        siteCode: string;
        gpsCoords: string | null;
        contactPhone: string | null;
    }>;
}
export {};
