import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ArController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        invoices: ({
            lines: {
                taxCode: string | null;
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                invoiceId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
            }[];
            payments: {
                id: string;
                tenantId: string;
                createdAt: Date;
                notes: string | null;
                invoiceId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                paymentDate: Date;
                reference: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            customerCode: string;
            invoiceDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date | null;
            invoiceNo: string;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        invoice: ({
            lines: {
                taxCode: string | null;
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                invoiceId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
            }[];
            payments: {
                id: string;
                tenantId: string;
                createdAt: Date;
                notes: string | null;
                invoiceId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                paymentDate: Date;
                reference: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            customerCode: string;
            invoiceDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date | null;
            invoiceNo: string;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        invoiceNo: string;
        customerCode: string;
        invoiceDate: string;
        dueDate?: string;
        description?: string;
        lines: {
            description: string;
            qty: number;
            unitPrice: number;
            taxCode?: string;
            amount: number;
        }[];
    }): Promise<{
        invoice: {
            lines: {
                taxCode: string | null;
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                invoiceId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            customerCode: string;
            invoiceDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date | null;
            invoiceNo: string;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    addPayment(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        paymentDate: string;
        amount: number;
        reference?: string;
        notes?: string;
    }): Promise<{
        invoice: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            customerCode: string;
            invoiceDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date | null;
            invoiceNo: string;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    debtCollection(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        collection: {
            id: string;
            invoiceNo: string;
            customerCode: string;
            invoiceDate: Date;
            dueDate: Date | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
            outstanding: number;
            daysOverdue: number;
            priority: string;
        }[];
        total: number;
    }>;
}
