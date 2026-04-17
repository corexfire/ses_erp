import { PrismaService } from '../../prisma/prisma.service';
import { WorkflowService } from '../../workflow/workflow.service';
export declare class QualityDocumentService {
    private readonly prisma;
    private readonly workflow;
    constructor(prisma: PrismaService, workflow: WorkflowService);
    findAll(tenantId: string, filters: any): Promise<({
        owner: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: import("prisma/generated").$Enums.QualityDocStatus;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        ownerId: string | null;
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        owner: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: import("prisma/generated").$Enums.QualityDocStatus;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        ownerId: string | null;
    }>;
    create(tenantId: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: import("prisma/generated").$Enums.QualityDocStatus;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        ownerId: string | null;
    }>;
    update(tenantId: string, id: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: import("prisma/generated").$Enums.QualityDocStatus;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        ownerId: string | null;
    }>;
    delete(tenantId: string, id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: import("prisma/generated").$Enums.QualityDocStatus;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        ownerId: string | null;
    }>;
    submitToWorkflow(tenantId: string, userId: string, id: string): Promise<({
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
    }) | null>;
}
