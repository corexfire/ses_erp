import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class FiscalController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        fiscalYears: ({
            periods: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date;
                fiscalYearId: string;
                periodNo: number;
                isOpen: boolean;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        code: string;
        name: string;
        startDate: string;
        endDate: string;
    }): Promise<{
        fiscalYear: {
            periods: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date;
                fiscalYearId: string;
                periodNo: number;
                isOpen: boolean;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        };
    }>;
    close(id: string): Promise<{
        fiscalYear: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        };
    }>;
}
export declare class PeriodController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        periods: ({
            fiscalYear: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                startDate: Date;
                endDate: Date;
                isClosed: boolean;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            fiscalYearId: string;
            periodNo: number;
            isOpen: boolean;
        })[];
    }>;
    close(id: string): Promise<{
        period: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            fiscalYearId: string;
            periodNo: number;
            isOpen: boolean;
        };
    }>;
    open(id: string): Promise<{
        period: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            fiscalYearId: string;
            periodNo: number;
            isOpen: boolean;
        };
    }>;
}
