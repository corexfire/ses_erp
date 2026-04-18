import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductionIssueDto, CreateProductionReceiptDto } from './dto/production.dto';
export declare class ProductionController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listIssues(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        issues: ({
            workOrder: {
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
                };
            } & {
                id: string;
                tenantId: string;
                lineNo: number;
                notes: string | null;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string;
                warehouseId: string | null;
                batchId: string | null;
                issueId: string;
                qtyRequired: import("@prisma/client-runtime-utils").Decimal | null;
                qtyScrap: import("@prisma/client-runtime-utils").Decimal;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            issueDate: Date;
            warehouseId: string | null;
            workOrderId: string;
            issuedBy: string | null;
            purpose: string | null;
            shiftNo: number | null;
        })[];
    }>;
    getIssue(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        issue: {
            workOrder: {
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
                };
            } & {
                id: string;
                tenantId: string;
                lineNo: number;
                notes: string | null;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string;
                warehouseId: string | null;
                batchId: string | null;
                issueId: string;
                qtyRequired: import("@prisma/client-runtime-utils").Decimal | null;
                qtyScrap: import("@prisma/client-runtime-utils").Decimal;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            issueDate: Date;
            warehouseId: string | null;
            workOrderId: string;
            issuedBy: string | null;
            purpose: string | null;
            shiftNo: number | null;
        };
    }>;
    createIssue(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProductionIssueDto): Promise<{
        issue: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            issueDate: Date;
            warehouseId: string | null;
            workOrderId: string;
            issuedBy: string | null;
            purpose: string | null;
            shiftNo: number | null;
        };
    }>;
    listReceipts(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        receipts: ({
            workOrder: {
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
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            uomCode: string | null;
            warehouseId: string | null;
            receiptDate: Date;
            workOrderId: string;
            qtyProduced: import("@prisma/client-runtime-utils").Decimal;
            qtyRejected: import("@prisma/client-runtime-utils").Decimal;
            qtyScrap: import("@prisma/client-runtime-utils").Decimal;
            shiftNo: number | null;
            receivedBy: string | null;
            batchNo: string | null;
        })[];
    }>;
    getReceipt(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        receipt: {
            workOrder: {
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
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            uomCode: string | null;
            warehouseId: string | null;
            receiptDate: Date;
            workOrderId: string;
            qtyProduced: import("@prisma/client-runtime-utils").Decimal;
            qtyRejected: import("@prisma/client-runtime-utils").Decimal;
            qtyScrap: import("@prisma/client-runtime-utils").Decimal;
            shiftNo: number | null;
            receivedBy: string | null;
            batchNo: string | null;
        };
    }>;
    createReceipt(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateProductionReceiptDto): Promise<{
        receipt: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date | null;
            code: string;
            status: string;
            notes: string | null;
            uomCode: string | null;
            warehouseId: string | null;
            receiptDate: Date;
            workOrderId: string;
            qtyProduced: import("@prisma/client-runtime-utils").Decimal;
            qtyRejected: import("@prisma/client-runtime-utils").Decimal;
            qtyScrap: import("@prisma/client-runtime-utils").Decimal;
            shiftNo: number | null;
            receivedBy: string | null;
            batchNo: string | null;
        };
    }>;
    listQc(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        qcs: ({
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
    createQc(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        workOrderId: string;
        qtyInspected: number;
        qtyPassed: number;
        qtyFailed: number;
        notes?: string;
        disposition?: string;
        inspectedBy?: string;
        qcDate?: string;
    }): Promise<{
        qc: {
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
    updateQc(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        status?: string;
        disposition?: string;
        notes?: string;
    }): Promise<{
        qc: {
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
