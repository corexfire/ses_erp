import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class FakturKeluaranController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string, status?: string): Promise<{
        invoices: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        };
    }>;
    autoGenerate(req: FastifyRequest & {
        user: AuthUser;
    }, invoiceId: string): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        };
    }>;
    issueFp(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        };
    }>;
}
export declare class FakturMasukanController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        invoices: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        invoiceNo: string;
        invoiceDate: string;
        supplierId?: string;
        baseAmount: number;
        taxAmount: number;
        fpNumber?: string;
        fpDate?: string;
    }): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        };
    }>;
}
export declare class NsfpController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        ranges: {
            id: string;
            tenantId: string;
            createdAt: Date;
            startDate: Date;
            endDate: Date | null;
            startNo: string;
            endNo: string;
            isUsed: boolean;
            lastUsedNo: string | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        startNo: string;
        endNo: string;
        startDate: string;
    }): Promise<{
        range: {
            id: string;
            tenantId: string;
            createdAt: Date;
            startDate: Date;
            endDate: Date | null;
            startNo: string;
            endNo: string;
            isUsed: boolean;
            lastUsedNo: string | null;
        };
    }>;
    useNsfp(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        usedNo: string;
    }): Promise<{
        range: {
            id: string;
            tenantId: string;
            createdAt: Date;
            startDate: Date;
            endDate: Date | null;
            startNo: string;
            endNo: string;
            isUsed: boolean;
            lastUsedNo: string | null;
        };
    }>;
}
export declare class PpnMasaController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    summary(req: FastifyRequest & {
        user: AuthUser;
    }, period: string): Promise<{
        summary: {
            period: string;
            totalOutput: number;
            totalInput: number;
            netPpn: number;
        };
        outputInvoices: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        }[];
        inputInvoices: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            referenceType: string | null;
            referenceId: string | null;
            status: string;
            referenceNo: string | null;
            customerId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceDate: Date;
            supplierId: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            invoiceNo: string;
            invoiceType: string;
            fpDate: Date | null;
            fpNumber: string | null;
            customerName: string | null;
            customerNpwp: string | null;
            customerAddress: string | null;
            customerNik: string | null;
            isReplacement: boolean;
            originalFpNumber: string | null;
            stampDuty: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxPeriod: string | null;
            taxYear: number | null;
        }[];
    }>;
}
