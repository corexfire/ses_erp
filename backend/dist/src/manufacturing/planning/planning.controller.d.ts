import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PlanningController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listSuggestions(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string, runId?: string): Promise<{
        suggestions: ({
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
            mrpRun: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date | null;
                status: string;
                notes: string | null;
                runDate: Date;
                demandSource: string | null;
                planningHorizonDays: number;
                periodStart: Date | null;
                periodEnd: Date | null;
                planType: string;
                includeSalesOrder: boolean;
                includeForecast: boolean;
                includeMinStock: boolean;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: number;
            updatedAt: Date | null;
            status: string;
            notes: string | null;
            uomCode: string | null;
            itemId: string;
            dueDate: Date | null;
            unitCost: import("@prisma/client-runtime-utils").Decimal | null;
            qtyOnHand: import("@prisma/client-runtime-utils").Decimal;
            mrpRunId: string;
            suggestionType: string;
            qtyRequired: import("@prisma/client-runtime-utils").Decimal;
            qtyOnOrder: import("@prisma/client-runtime-utils").Decimal;
            qtySuggested: import("@prisma/client-runtime-utils").Decimal;
            sourceDocType: string | null;
            sourceDocId: string | null;
            totalCost: import("@prisma/client-runtime-utils").Decimal | null;
            workCenter: string | null;
            suggestedDate: Date | null;
            leadTimeDays: number | null;
            bomId: string | null;
            workOrderId: string | null;
        })[];
    }>;
    listRuns(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        runs: ({
            suggestions: {
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: number;
                updatedAt: Date | null;
                status: string;
                notes: string | null;
                uomCode: string | null;
                itemId: string;
                dueDate: Date | null;
                unitCost: import("@prisma/client-runtime-utils").Decimal | null;
                qtyOnHand: import("@prisma/client-runtime-utils").Decimal;
                mrpRunId: string;
                suggestionType: string;
                qtyRequired: import("@prisma/client-runtime-utils").Decimal;
                qtyOnOrder: import("@prisma/client-runtime-utils").Decimal;
                qtySuggested: import("@prisma/client-runtime-utils").Decimal;
                sourceDocType: string | null;
                sourceDocId: string | null;
                totalCost: import("@prisma/client-runtime-utils").Decimal | null;
                workCenter: string | null;
                suggestedDate: Date | null;
                leadTimeDays: number | null;
                bomId: string | null;
                workOrderId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            status: string;
            notes: string | null;
            runDate: Date;
            demandSource: string | null;
            planningHorizonDays: number;
            periodStart: Date | null;
            periodEnd: Date | null;
            planType: string;
            includeSalesOrder: boolean;
            includeForecast: boolean;
            includeMinStock: boolean;
        })[];
    }>;
    runMrp(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        demandSource?: string;
        planType?: string;
        planningHorizonDays?: number;
        periodStart?: string;
        notes?: string;
        includeSalesOrder?: boolean;
        includeForecast?: boolean;
        includeMinStock?: boolean;
    }): Promise<{
        run: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            status: string;
            notes: string | null;
            runDate: Date;
            demandSource: string | null;
            planningHorizonDays: number;
            periodStart: Date | null;
            periodEnd: Date | null;
            planType: string;
            includeSalesOrder: boolean;
            includeForecast: boolean;
            includeMinStock: boolean;
        };
    }>;
    getRun(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        run: {
            suggestions: ({
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
                priority: number;
                updatedAt: Date | null;
                status: string;
                notes: string | null;
                uomCode: string | null;
                itemId: string;
                dueDate: Date | null;
                unitCost: import("@prisma/client-runtime-utils").Decimal | null;
                qtyOnHand: import("@prisma/client-runtime-utils").Decimal;
                mrpRunId: string;
                suggestionType: string;
                qtyRequired: import("@prisma/client-runtime-utils").Decimal;
                qtyOnOrder: import("@prisma/client-runtime-utils").Decimal;
                qtySuggested: import("@prisma/client-runtime-utils").Decimal;
                sourceDocType: string | null;
                sourceDocId: string | null;
                totalCost: import("@prisma/client-runtime-utils").Decimal | null;
                workCenter: string | null;
                suggestedDate: Date | null;
                leadTimeDays: number | null;
                bomId: string | null;
                workOrderId: string | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            status: string;
            notes: string | null;
            runDate: Date;
            demandSource: string | null;
            planningHorizonDays: number;
            periodStart: Date | null;
            periodEnd: Date | null;
            planType: string;
            includeSalesOrder: boolean;
            includeForecast: boolean;
            includeMinStock: boolean;
        };
    }>;
}
