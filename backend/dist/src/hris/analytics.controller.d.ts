import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class HrisAnalyticsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAnalytics(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        metrics: {
            activeHeadcount: number;
            terminatedCount: number;
            turnoverRate: number;
            currentPayroll: number;
            attendanceRate: number;
        };
        deptDistribution: {
            name: string;
            count: number;
        }[];
        payrollTrend: {
            period: string;
            amount: number;
        }[];
        attendanceStats: (import("prisma/generated").Prisma.PickEnumerable<import("prisma/generated").Prisma.AttendanceGroupByOutputType, "status"[]> & {
            _count: {
                _all: number;
            };
        })[];
    }>;
}
