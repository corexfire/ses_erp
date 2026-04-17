import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateProgressClaimDto {
    projectId: string;
    contractTermijnId?: string;
    periodFrom: string;
    periodTo: string;
    percentage: number;
    amount: number;
    notes?: string;
}
export declare class CreateProgressInvoiceDto {
    projectId: string;
    progressClaimId: string;
    amount: number;
    invoiceNo?: string;
    status?: string;
}
export declare class UpdateProgressInvoiceDto {
    invoiceNo?: string;
    status?: string;
    amount?: number;
}
export declare class BillingController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string): Promise<{
        data: {
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
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProgressClaimDto): Promise<{
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
    }>;
    get(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    } | null>;
    submit(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    approve(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    generateInvoice(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    listInvoices(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: ({
            project: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                startDate: Date | null;
                endDate: Date | null;
                customerId: string | null;
                status: string;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
        } & {
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
        })[];
    }>;
    createInvoice(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProgressInvoiceDto): Promise<{
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
    }>;
    updateInvoice(id: string, body: UpdateProgressInvoiceDto, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    exportToAr(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        success: boolean;
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
}
