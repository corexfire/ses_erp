import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePutawayDto, UpdatePutawayDto } from './dto/create-putaway.dto';
export declare class PutawayController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        putaways: ({
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
            grn: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            warehouseId: string;
            grnId: string | null;
            putawayDate: Date;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        putaway: {
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
                fromBinLocation: {
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
                toBinLocation: {
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
                itemId: string | null;
                serialNo: string | null;
                batchCode: string | null;
                fromBinLocationId: string | null;
                grnItemId: string | null;
                toBinLocationId: string | null;
                putawayId: string;
            })[];
            grn: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            warehouseId: string;
            grnId: string | null;
            putawayDate: Date;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePutawayDto): Promise<{
        putaway: {
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
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                serialNo: string | null;
                batchCode: string | null;
                fromBinLocationId: string | null;
                grnItemId: string | null;
                toBinLocationId: string | null;
                putawayId: string;
            })[];
            grn: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            warehouseId: string;
            grnId: string | null;
            putawayDate: Date;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePutawayDto): Promise<{
        putaway: {
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
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                serialNo: string | null;
                batchCode: string | null;
                fromBinLocationId: string | null;
                grnItemId: string | null;
                toBinLocationId: string | null;
                putawayId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            warehouseId: string;
            grnId: string | null;
            putawayDate: Date;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        putaway: {
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
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                serialNo: string | null;
                batchCode: string | null;
                fromBinLocationId: string | null;
                grnItemId: string | null;
                toBinLocationId: string | null;
                putawayId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            warehouseId: string;
            grnId: string | null;
            putawayDate: Date;
        };
    }>;
}
