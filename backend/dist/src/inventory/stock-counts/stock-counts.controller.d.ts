import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockCountDto } from './dto/create-stock-count.dto';
import { UpdateStockCountDto } from './dto/update-stock-count.dto';
export declare class StockCountsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private toNumber;
    private currentQty;
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        stockCounts: ({
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
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            warehouseId: string;
            countDate: Date;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        stockCount: {
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
                uomCode: string | null;
                itemId: string | null;
                serialNo: string | null;
                binLocationId: string | null;
                batchCode: string | null;
                countedQty: import("@prisma/client-runtime-utils").Decimal;
                stockCountId: string;
                systemQty: import("@prisma/client-runtime-utils").Decimal;
                varianceQty: import("@prisma/client-runtime-utils").Decimal;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            warehouseId: string;
            countDate: Date;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateStockCountDto): Promise<{
        stockCount: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            warehouseId: string;
            countDate: Date;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateStockCountDto): Promise<{
        stockCount: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            warehouseId: string;
            countDate: Date;
        };
    }>;
    post(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        stockCount: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            warehouseId: string;
            countDate: Date;
        };
    }>;
}
