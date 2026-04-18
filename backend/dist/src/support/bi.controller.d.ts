import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class UpsertKpiDto {
    code: string;
    name: string;
    category: string;
    period: string;
    targetValue: number;
    actualValue?: number;
    unit: string;
    notes?: string;
}
export declare class SupportBiController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        summary: {
            totalAssets: number;
            totalDocuments: number;
            totalComplianceRecords: number;
            averageHealthScore: number;
        };
        kpis: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            actualValue: import("@prisma/client-runtime-utils").Decimal;
            targetValue: import("@prisma/client-runtime-utils").Decimal;
            notes: string | null;
            category: string;
            period: string;
            unit: string;
        }[];
        statusDistribution: {
            onTrack: number;
            atRisk: number;
            behind: number;
        };
    }>;
    getMetrics(req: FastifyRequest & {
        user: AuthUser;
    }, category?: string): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        actualValue: import("@prisma/client-runtime-utils").Decimal;
        targetValue: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        category: string;
        period: string;
        unit: string;
    }[]>;
    upsertKpi(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertKpiDto): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        actualValue: import("@prisma/client-runtime-utils").Decimal;
        targetValue: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        category: string;
        period: string;
        unit: string;
    }>;
    deleteKpi(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        actualValue: import("@prisma/client-runtime-utils").Decimal;
        targetValue: import("@prisma/client-runtime-utils").Decimal;
        notes: string | null;
        category: string;
        period: string;
        unit: string;
    }>;
}
export {};
