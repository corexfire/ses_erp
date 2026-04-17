import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class InterCompanyController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        transactions: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            transDate: Date;
            transNo: string;
            fromCompanyId: string;
            toCompanyId: string;
            transactionType: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        transaction: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            transDate: Date;
            transNo: string;
            fromCompanyId: string;
            toCompanyId: string;
            transactionType: string;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        transNo: string;
        transDate: string;
        fromCompanyId: string;
        toCompanyId: string;
        description?: string;
        referenceNo?: string;
        transactionType?: string;
        amount: number;
    }): Promise<{
        transaction: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            transDate: Date;
            transNo: string;
            fromCompanyId: string;
            toCompanyId: string;
            transactionType: string;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        transaction: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            transDate: Date;
            transNo: string;
            fromCompanyId: string;
            toCompanyId: string;
            transactionType: string;
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        transaction: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            transDate: Date;
            transNo: string;
            fromCompanyId: string;
            toCompanyId: string;
            transactionType: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
