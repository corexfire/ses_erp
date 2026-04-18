import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AiForecastController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getForecasts(req: FastifyRequest, search?: string): Promise<{
        data: ({
            item: {
                name: string;
                code: string;
                reorderPoint: import("@prisma/client-runtime-utils").Decimal | null;
                reorderQty: import("@prisma/client-runtime-utils").Decimal | null;
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            itemId: string;
            forecastDate: Date;
            targetPeriod: string;
            confidenceScore: import("@prisma/client-runtime-utils").Decimal;
            predictedDemand: import("@prisma/client-runtime-utils").Decimal;
            recommendedQty: import("@prisma/client-runtime-utils").Decimal;
            trend: string;
            insights: string | null;
        })[];
        summary: {
            totalForecastsCount: number;
            highRiskStockouts: number;
            upwardTrends: number;
        };
    }>;
    applyRestockParams(req: FastifyRequest, body: {
        itemId: string;
        recommendedQty: string;
    }): Promise<{
        message: string;
        data: {
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
}
