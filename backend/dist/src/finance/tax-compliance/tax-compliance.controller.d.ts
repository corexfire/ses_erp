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
export declare class EBupotController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        withholdings: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        withholding: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        transNo: string;
        transDate: string;
        incomeType: string;
        taxpayerName: string;
        npwp?: string;
        nik?: string;
        grossAmount: number;
        rate: number;
    }): Promise<{
        withholding: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        };
    }>;
    issueBupot(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        bupotNo: string;
        bupotDate: string;
    }): Promise<{
        withholding: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        };
    }>;
}
export declare class Pph21Controller {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        withholdings: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        transNo: string;
        transDate: string;
        taxpayerName: string;
        npwp?: string;
        nik?: string;
        grossAmount: number;
        rate: number;
    }): Promise<{
        withholding: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        };
    }>;
}
export declare class BuktiPotongController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, year?: string): Promise<{
        withholdings: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        }[];
    }>;
    print(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        withholding: {
            id: string;
            tenantId: string;
            createdAt: Date;
            npwp: string | null;
            rate: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            nik: string | null;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            transDate: Date;
            transNo: string;
            incomeType: string;
            taxpayerName: string;
            grossAmount: import("@prisma/client-runtime-utils").Decimal;
            bupotNo: string | null;
            bupotDate: Date | null;
        } | null;
    }>;
}
export declare class IdBillingController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        billings: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            period: string;
            billingNo: string;
            taxType: string;
            paidDate: Date | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        billingNo: string;
        taxType: string;
        period: string;
        amount: number;
        dueDate: string;
    }): Promise<{
        billing: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            period: string;
            billingNo: string;
            taxType: string;
            paidDate: Date | null;
        };
    }>;
    markPaid(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        billing: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            period: string;
            billingNo: string;
            taxType: string;
            paidDate: Date | null;
        };
    }>;
}
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
