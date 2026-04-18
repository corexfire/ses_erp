import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class BankReconciliationController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, bankAccountId?: string): Promise<{
        reconciliations: ({
            bankAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                bankName: string | null;
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
            bankAccountId: string;
            reconcileDate: Date;
            statementDate: Date;
            statementBalance: import("@prisma/client-runtime-utils").Decimal;
            bookBalance: import("@prisma/client-runtime-utils").Decimal;
            difference: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        reconciliation: ({
            bankAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                bankName: string | null;
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
            bankAccountId: string;
            reconcileDate: Date;
            statementDate: Date;
            statementBalance: import("@prisma/client-runtime-utils").Decimal;
            bookBalance: import("@prisma/client-runtime-utils").Decimal;
            difference: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        bankAccountId: string;
        reconcileDate: string;
        statementDate: string;
        statementBalance: number;
        bookBalance: number;
    }): Promise<{
        reconciliation: {
            bankAccount: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                bankName: string | null;
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
            bankAccountId: string;
            reconcileDate: Date;
            statementDate: Date;
            statementBalance: import("@prisma/client-runtime-utils").Decimal;
            bookBalance: import("@prisma/client-runtime-utils").Decimal;
            difference: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        reconciliation: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            bankAccountId: string;
            reconcileDate: Date;
            statementDate: Date;
            statementBalance: import("@prisma/client-runtime-utils").Decimal;
            bookBalance: import("@prisma/client-runtime-utils").Decimal;
            difference: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
