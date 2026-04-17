import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CalculateCostDto, FinalizeCostDto } from './dto/costing.dto';
export declare class CostingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listSummaries(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        costs: ({
            workOrder: {
                finishedGood: {
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
                priority: number;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProductionDocStatus;
                notes: string | null;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
                uomCode: string | null;
                warehouseId: string | null;
                mrpRunId: string | null;
                workCenter: string | null;
                bomId: string | null;
                scrapPercent: import("@prisma/client-runtime-utils").Decimal;
                finishedGoodItemId: string;
                qtyPlanned: import("@prisma/client-runtime-utils").Decimal;
                plannedStartDate: Date | null;
                plannedEndDate: Date | null;
                qtyProduced: import("@prisma/client-runtime-utils").Decimal;
                actualStartDate: Date | null;
                actualEndDate: Date | null;
                scheduleType: string;
                refDocType: string | null;
                refDocId: string | null;
                qtyRejected: import("@prisma/client-runtime-utils").Decimal;
                qtyScrap: import("@prisma/client-runtime-utils").Decimal;
                targetWarehouseId: string | null;
                productionOrder: string | null;
            };
            details: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                productionCostId: string;
                costCategory: string;
                standardAmount: import("@prisma/client-runtime-utils").Decimal;
                actualAmount: import("@prisma/client-runtime-utils").Decimal;
                variance: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            totalCost: import("@prisma/client-runtime-utils").Decimal;
            workOrderId: string;
            period: string;
            laborCost: import("@prisma/client-runtime-utils").Decimal;
            materialCost: import("@prisma/client-runtime-utils").Decimal;
            overheadCost: import("@prisma/client-runtime-utils").Decimal;
            calculatedAt: Date;
            materialVariance: import("@prisma/client-runtime-utils").Decimal;
            laborVariance: import("@prisma/client-runtime-utils").Decimal;
            overheadVariance: import("@prisma/client-runtime-utils").Decimal;
            standardCost: import("@prisma/client-runtime-utils").Decimal;
            actualCost: import("@prisma/client-runtime-utils").Decimal;
            journalEntryId: string | null;
            isFinalized: boolean;
        })[];
    }>;
    calculateCost(req: FastifyRequest & {
        user: AuthUser;
    }, body: CalculateCostDto): Promise<{
        cost: {
            id: string;
            tenantId: string;
            totalCost: import("@prisma/client-runtime-utils").Decimal;
            workOrderId: string;
            period: string;
            laborCost: import("@prisma/client-runtime-utils").Decimal;
            materialCost: import("@prisma/client-runtime-utils").Decimal;
            overheadCost: import("@prisma/client-runtime-utils").Decimal;
            calculatedAt: Date;
            materialVariance: import("@prisma/client-runtime-utils").Decimal;
            laborVariance: import("@prisma/client-runtime-utils").Decimal;
            overheadVariance: import("@prisma/client-runtime-utils").Decimal;
            standardCost: import("@prisma/client-runtime-utils").Decimal;
            actualCost: import("@prisma/client-runtime-utils").Decimal;
            journalEntryId: string | null;
            isFinalized: boolean;
        };
    }>;
    finalizeCost(req: FastifyRequest & {
        user: AuthUser;
    }, body: FinalizeCostDto): Promise<{
        cost: {
            id: string;
            tenantId: string;
            totalCost: import("@prisma/client-runtime-utils").Decimal;
            workOrderId: string;
            period: string;
            laborCost: import("@prisma/client-runtime-utils").Decimal;
            materialCost: import("@prisma/client-runtime-utils").Decimal;
            overheadCost: import("@prisma/client-runtime-utils").Decimal;
            calculatedAt: Date;
            materialVariance: import("@prisma/client-runtime-utils").Decimal;
            laborVariance: import("@prisma/client-runtime-utils").Decimal;
            overheadVariance: import("@prisma/client-runtime-utils").Decimal;
            standardCost: import("@prisma/client-runtime-utils").Decimal;
            actualCost: import("@prisma/client-runtime-utils").Decimal;
            journalEntryId: string | null;
            isFinalized: boolean;
        };
        journal: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            status: string;
            entryNo: string;
            entryDate: Date;
            accountingPeriodId: string | null;
            totalDebit: import("@prisma/client-runtime-utils").Decimal;
            totalCredit: import("@prisma/client-runtime-utils").Decimal;
            referenceNo: string | null;
            journalType: string;
        };
    }>;
}
