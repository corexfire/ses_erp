import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class StockController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toNumber;
    ledger(req: FastifyRequest & {
        user: AuthUser;
    }, itemId?: string, warehouseId?: string, binLocationId?: string, refType?: string, refId?: string): Promise<{
        lines: ({
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
    }>;
    summary(req: FastifyRequest & {
        user: AuthUser;
    }, warehouseId?: string, itemId?: string): Promise<{
        rows: {
            itemId: string | null;
            warehouseId: string;
            binLocationId: string | null;
            item: {
                id: string;
                name: string;
                code: string;
            } | null;
            warehouse: {
                id: string;
                name: string;
                code: string;
            } | null;
            binLocation: {
                id: string;
                name: string | null;
                code: string;
                warehouseId: string;
            } | null;
            qtyIn: string;
            qtyOut: string;
            qtyOnHand: string;
        }[];
    }>;
}
