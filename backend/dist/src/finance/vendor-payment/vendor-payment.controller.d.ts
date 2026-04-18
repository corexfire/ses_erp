import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class VendorPaymentController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        payments: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierCode: string;
            paymentDate: Date;
            reference: string | null;
            paymentMethod: string;
            paymentNo: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        payment: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierCode: string;
            paymentDate: Date;
            reference: string | null;
            paymentMethod: string;
            paymentNo: string;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        paymentNo: string;
        paymentDate: string;
        supplierCode: string;
        amount: number;
        paymentMethod: string;
        reference?: string;
        notes?: string;
    }): Promise<{
        payment: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierCode: string;
            paymentDate: Date;
            reference: string | null;
            paymentMethod: string;
            paymentNo: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
