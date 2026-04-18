import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class EqualizationController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        equalizations: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        equalization: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        period: string;
        bookIncome: number;
        fiscalIncome: number;
        description?: string;
    }): Promise<{
        equalization: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        equalization: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
export declare class FiscalReconciliationController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        equalizations: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        equalization: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            period: string;
            difference: import("@prisma/client-runtime-utils").Decimal;
            bookIncome: import("@prisma/client-runtime-utils").Decimal;
            fiscalIncome: import("@prisma/client-runtime-utils").Decimal;
        } | null;
    }>;
    generateReport(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        report: {
            equalizationId: string;
            period: string;
            bookIncome: number;
            fiscalIncome: number;
            difference: number;
            adjustments: {
                item: string;
                amount: number;
                type: string;
            }[];
            journalSummary: number;
        };
    }>;
}
