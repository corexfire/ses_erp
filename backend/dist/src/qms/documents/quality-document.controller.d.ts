import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../../auth/auth.types';
import { QualityDocumentService } from './quality-document.service';
export declare class QualityDocumentController {
    private readonly docService;
    constructor(docService: QualityDocumentService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, query: any): Promise<{
        list: ({
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        document: {
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        document: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        document: {
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
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
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
