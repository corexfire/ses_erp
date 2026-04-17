import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBomDto, UpdateBomDto } from './dto/bom.dto';
export declare class BomController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, isActive?: string): Promise<{
        boms: ({
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
            items: ({
                componentItem: {
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
                notes: string | null;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                bomId: string;
                componentItemId: string;
                issueMethod: string;
                operationNo: number | null;
                scrapPercent: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
            operations: {
                id: string;
                tenantId: string;
                description: string;
                notes: string | null;
                bomId: string;
                operationNo: number;
                workstation: string | null;
                setupTime: import("@prisma/client-runtime-utils").Decimal | null;
                cycleTime: import("@prisma/client-runtime-utils").Decimal | null;
                laborScrap: import("@prisma/client-runtime-utils").Decimal | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            notes: string | null;
            itemId: string;
            version: number;
            bomType: string;
            baseQty: import("@prisma/client-runtime-utils").Decimal;
            costingMethod: string;
            isMain: boolean;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        bom: {
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
            items: ({
                componentItem: {
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
                notes: string | null;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                bomId: string;
                componentItemId: string;
                issueMethod: string;
                operationNo: number | null;
                scrapPercent: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
            operations: {
                id: string;
                tenantId: string;
                description: string;
                notes: string | null;
                bomId: string;
                operationNo: number;
                workstation: string | null;
                setupTime: import("@prisma/client-runtime-utils").Decimal | null;
                cycleTime: import("@prisma/client-runtime-utils").Decimal | null;
                laborScrap: import("@prisma/client-runtime-utils").Decimal | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            notes: string | null;
            itemId: string;
            version: number;
            bomType: string;
            baseQty: import("@prisma/client-runtime-utils").Decimal;
            costingMethod: string;
            isMain: boolean;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateBomDto): Promise<{
        bom: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            notes: string | null;
            itemId: string;
            version: number;
            bomType: string;
            baseQty: import("@prisma/client-runtime-utils").Decimal;
            costingMethod: string;
            isMain: boolean;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateBomDto): Promise<{
        bom: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            notes: string | null;
            itemId: string;
            version: number;
            bomType: string;
            baseQty: import("@prisma/client-runtime-utils").Decimal;
            costingMethod: string;
            isMain: boolean;
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        bom: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            notes: string | null;
            itemId: string;
            version: number;
            bomType: string;
            baseQty: import("@prisma/client-runtime-utils").Decimal;
            costingMethod: string;
            isMain: boolean;
        };
    }>;
}
