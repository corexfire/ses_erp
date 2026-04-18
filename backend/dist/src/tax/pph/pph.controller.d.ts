import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
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
