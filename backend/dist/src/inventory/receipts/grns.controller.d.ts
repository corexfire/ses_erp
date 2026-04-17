import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGrnDto } from './dto/create-grn.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';
export declare class GrnsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        grns: ({
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
            } | null;
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
            } | null;
            purchaseInvoice: {
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
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            supplierId: string | null;
            warehouseId: string;
            receiptDate: Date;
            purchaseOrderId: string | null;
            purchaseInvoiceId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        grn: {
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
            } | null;
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
            } | null;
            purchaseInvoice: {
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
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
            items: ({
                item: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                    code: string;
                    itemGroupId: string | null;
                    baseUomCode: string | null;
                    trackingType: import("prisma/generated").$Enums.ItemTrackingType;
                    valuationMethod: import("prisma/generated").$Enums.ValuationMethod;
                    reorderPoint: import("@prisma/client-runtime-utils").Decimal | null;
                    reorderQty: import("@prisma/client-runtime-utils").Decimal | null;
                    isPurchaseItem: boolean;
                    isSalesItem: boolean;
                    purchaseTaxCodeId: string | null;
                    salesTaxCodeId: string | null;
                    brand: string | null;
                    isSparePart: boolean;
                    manufacturer: string | null;
                    oemPartNumber: string | null;
                } | null;
                binLocation: {
                    id: string;
                    tenantId: string;
                    name: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    code: string;
                    type: import("prisma/generated").$Enums.BinType;
                    warehouseId: string;
                    zoneId: string | null;
                } | null;
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string | null;
                serialNo: string | null;
                warehouseId: string;
                binLocationId: string | null;
                batchCode: string | null;
                grnId: string;
            })[];
            qcInspections: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                grnId: string | null;
                inspectionDate: Date;
                inspectorName: string | null;
                productionId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            supplierId: string | null;
            warehouseId: string;
            receiptDate: Date;
            purchaseOrderId: string | null;
            purchaseInvoiceId: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateGrnDto): Promise<{
        grn: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            supplierId: string | null;
            warehouseId: string;
            receiptDate: Date;
            purchaseOrderId: string | null;
            purchaseInvoiceId: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateGrnDto): Promise<{
        grn: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            supplierId: string | null;
            warehouseId: string;
            receiptDate: Date;
            purchaseOrderId: string | null;
            purchaseInvoiceId: string | null;
        };
    }>;
    post(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        grn: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            supplierId: string | null;
            warehouseId: string;
            receiptDate: Date;
            purchaseOrderId: string | null;
            purchaseInvoiceId: string | null;
        };
    }>;
}
