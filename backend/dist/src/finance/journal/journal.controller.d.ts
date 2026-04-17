import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class JournalController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        entries: ({
            lines: {
                id: string;
                tenantId: string;
                description: string | null;
                lineNo: number;
                costCenterId: string | null;
                referenceType: string | null;
                referenceId: string | null;
                journalEntryId: string;
                accountCode: string;
                debit: import("@prisma/client-runtime-utils").Decimal;
                credit: import("@prisma/client-runtime-utils").Decimal;
                profitCenterId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        entry: ({
            lines: {
                id: string;
                tenantId: string;
                description: string | null;
                lineNo: number;
                costCenterId: string | null;
                referenceType: string | null;
                referenceId: string | null;
                journalEntryId: string;
                accountCode: string;
                debit: import("@prisma/client-runtime-utils").Decimal;
                credit: import("@prisma/client-runtime-utils").Decimal;
                profitCenterId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        entryDate: string;
        description?: string;
        referenceNo?: string;
        journalType?: string;
        lines: {
            accountCode: string;
            description?: string;
            debit: number;
            credit: number;
            costCenterId?: string;
        }[];
    }): Promise<{
        entry: {
            lines: {
                id: string;
                tenantId: string;
                description: string | null;
                lineNo: number;
                costCenterId: string | null;
                referenceType: string | null;
                referenceId: string | null;
                journalEntryId: string;
                accountCode: string;
                debit: import("@prisma/client-runtime-utils").Decimal;
                credit: import("@prisma/client-runtime-utils").Decimal;
                profitCenterId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        entryDate?: string;
        description?: string;
        referenceNo?: string;
        journalType?: string;
        lines?: {
            accountCode: string;
            description?: string;
            debit: number;
            credit: number;
            costCenterId?: string;
        }[];
    }): Promise<{
        entry: {
            lines: {
                id: string;
                tenantId: string;
                description: string | null;
                lineNo: number;
                costCenterId: string | null;
                referenceType: string | null;
                referenceId: string | null;
                journalEntryId: string;
                accountCode: string;
                debit: import("@prisma/client-runtime-utils").Decimal;
                credit: import("@prisma/client-runtime-utils").Decimal;
                profitCenterId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
    post(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        entry: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        };
    }>;
}
