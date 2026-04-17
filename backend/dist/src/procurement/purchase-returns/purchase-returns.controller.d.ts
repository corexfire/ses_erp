import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseReturnDto } from './dto/create-purchase-return.dto';
import { UpdatePurchaseReturnDto } from './dto/update-purchase-return.dto';
export declare class PurchaseReturnsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private validateTaxCodes;
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        purchaseReturns: ({
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
            order: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
                supplierId: string;
                paymentTerms: string | null;
                rfqId: string | null;
                expectedDeliveryDate: Date | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                shippingAddress: string | null;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
            } | null;
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
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            returnDate: Date;
            supplierId: string;
            receiptId: string | null;
            grandTotal: import("@prisma/client-runtime-utils").Decimal;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        purchaseReturn: {
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
            order: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
                supplierId: string;
                paymentTerms: string | null;
                rfqId: string | null;
                expectedDeliveryDate: Date | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                shippingAddress: string | null;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            items: ({
                taxCode: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    code: string;
                    rate: import("@prisma/client-runtime-utils").Decimal;
                    effectiveDate: Date;
                } | null;
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                taxCodeId: string | null;
                itemId: string | null;
                amount: import("@prisma/client-runtime-utils").Decimal;
                returnId: string;
                receiptLineNo: number | null;
            })[];
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
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            returnDate: Date;
            supplierId: string;
            receiptId: string | null;
            grandTotal: import("@prisma/client-runtime-utils").Decimal;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePurchaseReturnDto): Promise<{
        purchaseReturn: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            returnDate: Date;
            supplierId: string;
            receiptId: string | null;
            grandTotal: import("@prisma/client-runtime-utils").Decimal;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePurchaseReturnDto): Promise<{
        purchaseReturn: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            returnDate: Date;
            supplierId: string;
            receiptId: string | null;
            grandTotal: import("@prisma/client-runtime-utils").Decimal;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
        };
    }>;
}
