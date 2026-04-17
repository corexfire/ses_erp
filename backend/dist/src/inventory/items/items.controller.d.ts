import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemGroupDto } from './dto/create-item-group.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemGroupDto } from './dto/update-item-group.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemUomDto, UpdateItemUomDto } from './dto/item-uom.dto';
import { CreateItemBarcodeDto } from './dto/item-barcode.dto';
export declare class ItemsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listItemGroups(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        itemGroups: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        }[];
    }>;
    createItemGroup(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateItemGroupDto): Promise<{
        itemGroup: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    updateItemGroup(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateItemGroupDto): Promise<{
        itemGroup: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    deactivateItemGroup(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        itemGroup: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    listItems(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, isActive?: string): Promise<{
        items: ({
            itemGroup: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
            stockBalances: {
                id: string;
                tenantId: string;
                updatedAt: Date;
                uomCode: string | null;
                itemId: string;
                warehouseId: string;
                binLocationId: string | null;
                batchId: string | null;
                serialId: string | null;
                qtyOnHand: import("@prisma/client-runtime-utils").Decimal;
                qtyAllocated: import("@prisma/client-runtime-utils").Decimal;
                qtyAvailable: import("@prisma/client-runtime-utils").Decimal;
                lastReceiptDate: Date | null;
            }[];
            barcodes: {
                id: string;
                tenantId: string;
                createdAt: Date;
                itemId: string;
                barcode: string;
            }[];
            uoms: {
                id: string;
                tenantId: string;
                createdAt: Date;
                isBase: boolean;
                uomCode: string;
                itemId: string;
                conversionRate: import("@prisma/client-runtime-utils").Decimal;
                price: import("@prisma/client-runtime-utils").Decimal | null;
            }[];
        } & {
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
        })[];
    }>;
    getItem(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        item: {
            itemGroup: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
            barcodes: {
                id: string;
                tenantId: string;
                createdAt: Date;
                itemId: string;
                barcode: string;
            }[];
            uoms: {
                id: string;
                tenantId: string;
                createdAt: Date;
                isBase: boolean;
                uomCode: string;
                itemId: string;
                conversionRate: import("@prisma/client-runtime-utils").Decimal;
                price: import("@prisma/client-runtime-utils").Decimal | null;
            }[];
        } & {
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
    }>;
    createItem(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateItemDto): Promise<{
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
    }>;
    updateItem(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateItemDto): Promise<{
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
    }>;
    deactivateItem(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
    }>;
    listItemUoms(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string): Promise<{
        uoms: {
            id: string;
            tenantId: string;
            createdAt: Date;
            isBase: boolean;
            uomCode: string;
            itemId: string;
            conversionRate: import("@prisma/client-runtime-utils").Decimal;
            price: import("@prisma/client-runtime-utils").Decimal | null;
        }[];
    }>;
    createItemUom(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string, body: CreateItemUomDto): Promise<{
        uom: {
            id: string;
            tenantId: string;
            createdAt: Date;
            isBase: boolean;
            uomCode: string;
            itemId: string;
            conversionRate: import("@prisma/client-runtime-utils").Decimal;
            price: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
    updateItemUom(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string, uomId: string, body: UpdateItemUomDto): Promise<{
        uom: {
            id: string;
            tenantId: string;
            createdAt: Date;
            isBase: boolean;
            uomCode: string;
            itemId: string;
            conversionRate: import("@prisma/client-runtime-utils").Decimal;
            price: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
    deleteItemUom(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string, uomId: string): Promise<{
        success: boolean;
    }>;
    listItemBarcodes(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string): Promise<{
        barcodes: {
            id: string;
            tenantId: string;
            createdAt: Date;
            itemId: string;
            barcode: string;
        }[];
    }>;
    createItemBarcode(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string, body: CreateItemBarcodeDto): Promise<{
        barcode: {
            id: string;
            tenantId: string;
            createdAt: Date;
            itemId: string;
            barcode: string;
        };
    }>;
    deleteItemBarcode(req: FastifyRequest & {
        user: AuthUser;
    }, itemId: string, barcodeId: string): Promise<{
        success: boolean;
    }>;
}
