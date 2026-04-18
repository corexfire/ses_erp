import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
export declare class PurchaseOrdersController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private validateTaxCodes;
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        purchaseOrders: ({
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
            rfq: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                issueDate: Date;
                closingDate: Date | null;
                department: string | null;
                title: string | null;
            } | null;
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        purchaseOrder: {
            returns: {
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
            }[];
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
            rfq: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                issueDate: Date;
                closingDate: Date | null;
                department: string | null;
                title: string | null;
            } | null;
            invoices: {
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
            }[];
            workflowDef: ({
                steps: {
                    id: string;
                    tenantId: string;
                    name: string | null;
                    createdAt: Date;
                    roleId: string;
                    updatedAt: Date;
                    stepNo: number;
                    conditionType: string | null;
                    conditionValue: import("@prisma/client-runtime-utils").Decimal | null;
                    slaHours: number;
                    definitionId: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                moduleKey: string;
                docType: string;
            }) | null;
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
                orderId: string;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                discount: import("@prisma/client-runtime-utils").Decimal | null;
                taxCodeId: string | null;
                itemId: string | null;
                amount: import("@prisma/client-runtime-utils").Decimal;
            })[];
            landedCosts: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceId: string | null;
                supplierId: string | null;
                costDate: Date;
                totalAmount: import("@prisma/client-runtime-utils").Decimal;
                apportionmentMethod: string;
                receiptId: string | null;
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePurchaseOrderDto): Promise<{
        purchaseOrder: {
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
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePurchaseOrderDto): Promise<{
        purchaseOrder: {
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
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        purchaseOrder: {
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
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        purchaseOrder: {
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
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        purchaseOrder: {
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
    }>;
}
