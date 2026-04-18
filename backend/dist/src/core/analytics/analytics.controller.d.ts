import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AnalyticsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getExecutiveSummary(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        financials: {
            totalRevenue: number;
            totalExpenses: number;
            netProfit: number;
            profitMargin: number;
        };
        operations: {
            activeProjects: number;
            pipelineValue: number | import("@prisma/client-runtime-utils").Decimal;
            inventoryValuation: number;
            openServiceOrders: number;
        };
        governance: {
            complianceScore: number | import("@prisma/client-runtime-utils").Decimal;
            carbonFootprint: number | import("@prisma/client-runtime-utils").Decimal;
        };
        trends: {
            revenue: {
                period: string;
                value: number;
            }[];
        };
    }>;
}
