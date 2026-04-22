import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../../auth/auth.types';
import { NcrService } from './ncr.service';
import { CreateNcrDto } from './dto/create-ncr.dto';
import { UpdateNcrDto } from './dto/update-ncr.dto';
export declare class NcrController {
    private readonly ncrService;
    constructor(ncrService: NcrService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, query: any): Promise<{
        list: ({
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
            assignedTo: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            qc: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                grnId: string | null;
                inspectionDate: Date;
                inspectorName: string | null;
                productionId: string | null;
            } | null;
            reportedBy: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.NcrStatus;
            assignedToId: string | null;
            qty: import("@prisma/client-runtime-utils").Decimal;
            itemId: string | null;
            sourceType: string;
            ncrType: string;
            severity: import("prisma/generated").$Enums.NcrSeverity;
            qcId: string | null;
            evidenceUrl: string | null;
            rootCause: string | null;
            disposition: import("prisma/generated").$Enums.NcrDisposition;
            reportedById: string;
            stockJournalId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        ncr: {
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
            assignedTo: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            qc: ({
                grn: {
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    code: string;
                    status: import("prisma/generated").$Enums.InventoryDocStatus;
                    notes: string | null;
                    warehouseId: string;
                    supplierId: string | null;
                    receiptDate: Date;
                    purchaseOrderId: string | null;
                    purchaseInvoiceId: string | null;
                } | null;
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                grnId: string | null;
                inspectionDate: Date;
                inspectorName: string | null;
                productionId: string | null;
            }) | null;
            reportedBy: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.NcrStatus;
            assignedToId: string | null;
            qty: import("@prisma/client-runtime-utils").Decimal;
            itemId: string | null;
            sourceType: string;
            ncrType: string;
            severity: import("prisma/generated").$Enums.NcrSeverity;
            qcId: string | null;
            evidenceUrl: string | null;
            rootCause: string | null;
            disposition: import("prisma/generated").$Enums.NcrDisposition;
            reportedById: string;
            stockJournalId: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateNcrDto): Promise<{
        ncr: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.NcrStatus;
            assignedToId: string | null;
            qty: import("@prisma/client-runtime-utils").Decimal;
            itemId: string | null;
            sourceType: string;
            ncrType: string;
            severity: import("prisma/generated").$Enums.NcrSeverity;
            qcId: string | null;
            evidenceUrl: string | null;
            rootCause: string | null;
            disposition: import("prisma/generated").$Enums.NcrDisposition;
            reportedById: string;
            stockJournalId: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateNcrDto): Promise<{
        ncr: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.NcrStatus;
            assignedToId: string | null;
            qty: import("@prisma/client-runtime-utils").Decimal;
            itemId: string | null;
            sourceType: string;
            ncrType: string;
            severity: import("prisma/generated").$Enums.NcrSeverity;
            qcId: string | null;
            evidenceUrl: string | null;
            rootCause: string | null;
            disposition: import("prisma/generated").$Enums.NcrDisposition;
            reportedById: string;
            stockJournalId: string | null;
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        instance: ({
            definition: {
                steps: {
                    id: string;
                    tenantId: string;
                    name: string | null;
                    createdAt: Date;
                    roleId: string;
                    updatedAt: Date;
                    stepNo: number;
                    conditionType: string | null;
                    conditionValue: import("@prisma/client-runtime-utils").Decimal | null;
                    slaHours: number;
                    definitionId: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                moduleKey: string;
                docType: string;
            };
            step: {
                role: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                };
                rules: {
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    ruleType: string;
                    ruleKey: string;
                    ruleOperator: string;
                    ruleValue: string;
                    stepId: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                name: string | null;
                createdAt: Date;
                roleId: string;
                updatedAt: Date;
                stepNo: number;
                conditionType: string | null;
                conditionValue: import("@prisma/client-runtime-utils").Decimal | null;
                slaHours: number;
                definitionId: string;
            };
            history: ({
                user: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                userId: string;
                action: import("prisma/generated").$Enums.ApprovalAction;
                fromUserId: string | null;
                toUserId: string | null;
                comment: string | null;
                instanceId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            docType: string;
            definitionId: string;
            status: import("prisma/generated").$Enums.WorkflowInstanceStatus;
            assignedToUserId: string | null;
            currentStepNo: number;
            docId: string;
            slaDueAt: Date | null;
            escalatedAt: Date | null;
            stepId: string;
        }) | null;
    }>;
}
