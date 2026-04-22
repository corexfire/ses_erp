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
        payments: ({
            supplier: {
                bankAccount: string | null;
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                bankName: string | null;
                paymentTerms: string | null;
                vendorGroup: string | null;
            };
            invoice: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
                supplierId: string;
                paymentTerms: string | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
                balanceDue: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date | null;
                taxFacturNumber: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string;
            paymentDate: Date;
            reference: string | null;
            paymentMethod: string;
            paymentNo: string;
        })[];
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
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string;
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
        supplierId: string;
        amount: number;
        paymentMethod: string;
        reference?: string;
        notes?: string;
        invoiceId?: string;
    }): Promise<{
        payment: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string;
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
