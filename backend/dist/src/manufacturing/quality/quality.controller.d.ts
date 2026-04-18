import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInProcessQcDto, UpdateInProcessQcDto } from './dto/quality.dto';
export declare class QualityController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        inspections: ({
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
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            workOrderId: string;
            disposition: string;
            qtyInspected: import("@prisma/client-runtime-utils").Decimal;
            qtyPassed: import("@prisma/client-runtime-utils").Decimal;
            qtyFailed: import("@prisma/client-runtime-utils").Decimal;
            inspectedAt: Date | null;
            inspectedBy: string | null;
            qcDate: Date | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        inspection: {
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
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            workOrderId: string;
            disposition: string;
            qtyInspected: import("@prisma/client-runtime-utils").Decimal;
            qtyPassed: import("@prisma/client-runtime-utils").Decimal;
            qtyFailed: import("@prisma/client-runtime-utils").Decimal;
            inspectedAt: Date | null;
            inspectedBy: string | null;
            qcDate: Date | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateInProcessQcDto): Promise<{
        inspection: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            workOrderId: string;
            disposition: string;
            qtyInspected: import("@prisma/client-runtime-utils").Decimal;
            qtyPassed: import("@prisma/client-runtime-utils").Decimal;
            qtyFailed: import("@prisma/client-runtime-utils").Decimal;
            inspectedAt: Date | null;
            inspectedBy: string | null;
            qcDate: Date | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateInProcessQcDto): Promise<{
        inspection: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            workOrderId: string;
            disposition: string;
            qtyInspected: import("@prisma/client-runtime-utils").Decimal;
            qtyPassed: import("@prisma/client-runtime-utils").Decimal;
            qtyFailed: import("@prisma/client-runtime-utils").Decimal;
            inspectedAt: Date | null;
            inspectedBy: string | null;
            qcDate: Date | null;
        };
    }>;
}
