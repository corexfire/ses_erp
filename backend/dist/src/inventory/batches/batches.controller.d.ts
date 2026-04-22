import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class BatchesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, itemId?: string): Promise<{
        batches: ({
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            itemId: string;
            expiryDate: Date | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        batch: ({
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
            };
            stockLedgers: ({
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
                createdAt: Date;
                description: string;
                uomCode: string | null;
                itemId: string | null;
                warehouseId: string;
                moveType: import("prisma/generated").$Enums.StockMoveType;
                refType: string;
                refId: string;
                postingDate: Date;
                qtyIn: import("@prisma/client-runtime-utils").Decimal;
                qtyOut: import("@prisma/client-runtime-utils").Decimal;
                binLocationId: string | null;
                batchId: string | null;
                serialId: string | null;
                unitCost: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            itemId: string;
            expiryDate: Date | null;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        itemId: string;
        code: string;
        expiryDate?: string;
    }): Promise<{
        batch: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            itemId: string;
            expiryDate: Date | null;
        };
    }>;
}
export declare class SerialsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, itemId?: string, status?: string): Promise<{
        serials: ({
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            itemId: string;
            serialNo: string;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        serial: ({
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
            };
            stockLedgers: ({
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
                createdAt: Date;
                description: string;
                uomCode: string | null;
                itemId: string | null;
                warehouseId: string;
                moveType: import("prisma/generated").$Enums.StockMoveType;
                refType: string;
                refId: string;
                postingDate: Date;
                qtyIn: import("@prisma/client-runtime-utils").Decimal;
                qtyOut: import("@prisma/client-runtime-utils").Decimal;
                binLocationId: string | null;
                batchId: string | null;
                serialId: string | null;
                unitCost: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            itemId: string;
            serialNo: string;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        itemId: string;
        serialNo: string;
        status?: string;
    }): Promise<{
        serial: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            itemId: string;
            serialNo: string;
        };
    }>;
}
