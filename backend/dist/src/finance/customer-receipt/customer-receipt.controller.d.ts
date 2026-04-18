import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class CustomerReceiptController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        receipts: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            customerCode: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receiptDate: Date;
            reference: string | null;
            receiptNo: string;
            paymentMethod: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        receipt: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            customerCode: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receiptDate: Date;
            reference: string | null;
            receiptNo: string;
            paymentMethod: string;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        receiptNo: string;
        receiptDate: string;
        customerCode: string;
        amount: number;
        paymentMethod: string;
        reference?: string;
        notes?: string;
    }): Promise<{
        receipt: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            customerCode: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            receiptDate: Date;
            reference: string | null;
            receiptNo: string;
            paymentMethod: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
