import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../auth/auth.types';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
export declare class SparePartsController {
    private readonly sparePartsService;
    constructor(sparePartsService: SparePartsService);
    findAll(req: FastifyRequest & {
        user: AuthUser;
    }, query?: string): Promise<({
        itemGroup: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        } | null;
        stockBalances: ({
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
        })[];
        fsmCompatibilities: ({
            equipment: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string | null;
                status: string;
                notes: string | null;
                manufacturer: string | null;
                location: string | null;
                installedDate: Date | null;
                serialNumber: string | null;
                model: string | null;
                criticality: string;
                purchaseDate: Date | null;
                warrantyExpiryDate: Date | null;
                workCenterId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            itemId: string;
            equipmentId: string;
        })[];
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
    })[]>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        lowStock: number;
        totalValue: number;
    }>;
    findOne(req: FastifyRequest & {
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
        } | null;
        stockBalances: ({
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
        })[];
        fsmCompatibilities: ({
            equipment: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string | null;
                status: string;
                notes: string | null;
                manufacturer: string | null;
                location: string | null;
                installedDate: Date | null;
                serialNumber: string | null;
                model: string | null;
                criticality: string;
                purchaseDate: Date | null;
                warrantyExpiryDate: Date | null;
                workCenterId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            itemId: string;
            equipmentId: string;
        })[];
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, dto: CreateSparePartDto): Promise<({
        fsmCompatibilities: ({
            equipment: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string | null;
                status: string;
                notes: string | null;
                manufacturer: string | null;
                location: string | null;
                installedDate: Date | null;
                serialNumber: string | null;
                model: string | null;
                criticality: string;
                purchaseDate: Date | null;
                warrantyExpiryDate: Date | null;
                workCenterId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            itemId: string;
            equipmentId: string;
        })[];
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
    }) | null>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, dto: UpdateSparePartDto): Promise<({
        fsmCompatibilities: ({
            equipment: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string | null;
                status: string;
                notes: string | null;
                manufacturer: string | null;
                location: string | null;
                installedDate: Date | null;
                serialNumber: string | null;
                model: string | null;
                criticality: string;
                purchaseDate: Date | null;
                warrantyExpiryDate: Date | null;
                workCenterId: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            itemId: string;
            equipmentId: string;
        })[];
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
    }) | null>;
    remove(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
    }>;
}
