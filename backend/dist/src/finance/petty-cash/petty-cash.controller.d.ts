import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class PettyCashController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        replenishment: ({
            cashAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                accountNo: string;
                accountType: string;
                balance: import("@prisma/client-runtime-utils").Decimal;
                coaAccountId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            referenceNo: string | null;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            cashAccountId: string;
            requestNo: string;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        replenishment: ({
            cashAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                accountNo: string;
                accountType: string;
                balance: import("@prisma/client-runtime-utils").Decimal;
                coaAccountId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            referenceNo: string | null;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            cashAccountId: string;
            requestNo: string;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        cashAccountId: string;
        requestNo: string;
        requestDate: string;
        amount: number;
        notes?: string;
        referenceNo?: string;
    }): Promise<{
        replenishment: {
            cashAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                accountNo: string;
                accountType: string;
                balance: import("@prisma/client-runtime-utils").Decimal;
                coaAccountId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            referenceNo: string | null;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            cashAccountId: string;
            requestNo: string;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        replenishment: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            referenceNo: string | null;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            cashAccountId: string;
            requestNo: string;
        };
        journalEntry: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            entryNo: string;
            entryDate: Date;
            status: string;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        replenishment: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            referenceNo: string | null;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            cashAccountId: string;
            requestNo: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
