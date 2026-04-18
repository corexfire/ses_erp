import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseRequisitionDto } from './dto/create-purchase-requisition.dto';
import { UpdatePurchaseRequisitionDto } from './dto/update-purchase-requisition.dto';
export declare class PurchaseRequisitionsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        requisitions: ({
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string | null;
                requiredDate: Date | null;
                requisitionId: string;
                estimatedPrice: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        requisition: {
            workflowDef: ({
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
            }) | null;
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string | null;
                requiredDate: Date | null;
                requisitionId: string;
                estimatedPrice: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePurchaseRequisitionDto): Promise<{
        requisition: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePurchaseRequisitionDto): Promise<{
        requisition: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        requisition: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        requisition: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        requisition: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            costCenterId: string | null;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
            department: string | null;
            requestDate: Date;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
