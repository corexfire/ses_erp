import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class ThreeWayMatchingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        matches: ({
            order: {
                supplier: {
                    name: string;
                    code: string;
                };
                code: string;
            };
            invoice: {
                code: string;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
            };
            receipt: {
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            orderId: string;
            invoiceId: string;
            receiptId: string;
            matchDate: Date;
            discrepancyNotes: string | null;
            varianceAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        match: ({
            order: {
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
                items: {
                    id: string;
                    tenantId: string;
                    description: string;
                    lineNo: number;
                    orderId: string;
                    qty: import("@prisma/client-runtime-utils").Decimal;
                    uomCode: string | null;
                    unitPrice: import("@prisma/client-runtime-utils").Decimal;
                    discount: import("@prisma/client-runtime-utils").Decimal | null;
                    taxCodeId: string | null;
                    itemId: string | null;
                    amount: import("@prisma/client-runtime-utils").Decimal;
                }[];
            } & {
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
            };
            invoice: {
                items: {
                    id: string;
                    tenantId: string;
                    description: string;
                    lineNo: number;
                    qty: import("@prisma/client-runtime-utils").Decimal;
                    uomCode: string | null;
                    unitPrice: import("@prisma/client-runtime-utils").Decimal;
                    discount: import("@prisma/client-runtime-utils").Decimal | null;
                    taxCodeId: string | null;
                    itemId: string | null;
                    invoiceId: string;
                    amount: import("@prisma/client-runtime-utils").Decimal;
                }[];
            } & {
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
            };
            receipt: {
                items: {
                    id: string;
                    tenantId: string;
                    description: string;
                    lineNo: number;
                    qty: import("@prisma/client-runtime-utils").Decimal;
                    uomCode: string | null;
                    itemId: string | null;
                    warehouseId: string;
                    serialNo: string | null;
                    binLocationId: string | null;
                    batchCode: string | null;
                    grnId: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                warehouseId: string;
                supplierId: string | null;
                receiptDate: Date;
                purchaseOrderId: string | null;
                purchaseInvoiceId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            orderId: string;
            invoiceId: string;
            receiptId: string;
            matchDate: Date;
            discrepancyNotes: string | null;
            varianceAmount: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    autoMatch(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        message: string;
        processedCount: number;
    }>;
}
