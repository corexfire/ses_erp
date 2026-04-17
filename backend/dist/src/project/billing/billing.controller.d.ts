import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgressClaimDto, CreateProgressInvoiceDto } from './dto/billing.dto';
export declare class BillingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listClaims(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        claims: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            claimNo: string;
            claimDate: Date;
            projectId: string;
            progressPercent: import("@prisma/client-runtime-utils").Decimal;
            attachmentUrl: string | null;
        }[];
    }>;
    createClaim(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProgressClaimDto): Promise<{
        claim: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            claimNo: string;
            claimDate: Date;
            projectId: string;
            progressPercent: import("@prisma/client-runtime-utils").Decimal;
            attachmentUrl: string | null;
        };
    }>;
    createInvoice(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProgressInvoiceDto): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            period: string | null;
            invoiceNo: string | null;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            claimDate: Date;
            projectId: string;
            progressPercent: import("@prisma/client-runtime-utils").Decimal;
            progressClaimId: string;
            retentionPercent: import("@prisma/client-runtime-utils").Decimal;
            dpDeductionAmount: import("@prisma/client-runtime-utils").Decimal;
            arInvoiceId: string | null;
            retentionAmount: import("@prisma/client-runtime-utils").Decimal;
            vatPercent: import("@prisma/client-runtime-utils").Decimal;
            vatAmount: import("@prisma/client-runtime-utils").Decimal;
            netAmount: import("@prisma/client-runtime-utils").Decimal;
            isRetentionReleased: boolean;
            retentionReleasedAt: Date | null;
        };
    }>;
    getProjectLedger(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        summary: {
            contractValue: import("@prisma/client-runtime-utils").Decimal | null;
            totalBilled: number;
            totalRetention: number;
            currentProgress: number;
            remainingBalance: number;
            billingSetup: {
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
        };
        invoices: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            period: string | null;
            invoiceNo: string | null;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            claimDate: Date;
            projectId: string;
            progressPercent: import("@prisma/client-runtime-utils").Decimal;
            progressClaimId: string;
            retentionPercent: import("@prisma/client-runtime-utils").Decimal;
            dpDeductionAmount: import("@prisma/client-runtime-utils").Decimal;
            arInvoiceId: string | null;
            retentionAmount: import("@prisma/client-runtime-utils").Decimal;
            vatPercent: import("@prisma/client-runtime-utils").Decimal;
            vatAmount: import("@prisma/client-runtime-utils").Decimal;
            netAmount: import("@prisma/client-runtime-utils").Decimal;
            isRetentionReleased: boolean;
            retentionReleasedAt: Date | null;
        }[];
        claims: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            claimNo: string;
            claimDate: Date;
            projectId: string;
            progressPercent: import("@prisma/client-runtime-utils").Decimal;
            attachmentUrl: string | null;
        }[];
    }>;
    releaseRetention(req: FastifyRequest & {
        user: AuthUser;
    }, projectId: string): Promise<{
        count: number;
    }>;
}
