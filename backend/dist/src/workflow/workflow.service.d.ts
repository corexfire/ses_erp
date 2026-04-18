import { PrismaService } from '../prisma/prisma.service';
export declare class WorkflowService {
    private prisma;
    constructor(prisma: PrismaService);
    getDefinitions(tenantId: string, moduleKey?: string, docType?: string): Promise<({
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
    })[]>;
    getDefinitionById(tenantId: string, id: string): Promise<({
        steps: ({
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
        })[];
    } & {
        id: string;
        tenantId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        moduleKey: string;
        docType: string;
    }) | null>;
    createDefinition(tenantId: string, data: {
        name: string;
        moduleKey: string;
        docType: string;
        steps: {
            roleId: string;
            name?: string;
            slaHours?: number;
            conditions?: {
                ruleType: string;
                ruleKey: string;
                ruleOperator: string;
                ruleValue: string;
            }[];
        }[];
    }): Promise<{
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
    }>;
    updateDefinition(tenantId: string, id: string, data: {
        name?: string;
        isActive?: boolean;
        steps?: {
            roleId: string;
            name?: string;
            slaHours?: number;
            conditions?: {
                ruleType: string;
                ruleKey: string;
                ruleOperator: string;
                ruleValue: string;
            }[];
        }[];
    }): Promise<({
        steps: ({
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
        })[];
    } & {
        id: string;
        tenantId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        moduleKey: string;
        docType: string;
    }) | null>;
    deleteDefinition(tenantId: string, id: string): Promise<void>;
    triggerWorkflow(tenantId: string, docType: string, docId: string, definitionId?: string): Promise<({
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
    getInstances(tenantId: string, filters: {
        docType?: string;
        docId?: string;
        status?: string;
        assignedToUserId?: string;
    }): Promise<({
        definition: {
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
    })[]>;
    getMyInbox(tenantId: string, userId: string): Promise<({
        definition: {
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
    })[]>;
    getInstanceById(tenantId: string, id: string): Promise<({
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
    approve(tenantId: string, userId: string, instanceId: string, comment?: string): Promise<({
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
    reject(tenantId: string, userId: string, instanceId: string, comment?: string): Promise<({
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
    delegate(tenantId: string, userId: string, instanceId: string, toUserId: string, comment?: string): Promise<({
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
    escalate(tenantId: string, instanceId: string): Promise<({
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
    getDelegations(tenantId: string, userId: string): Promise<({
        toUser: {
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
        isActive: boolean;
        createdAt: Date;
        startDate: Date;
        endDate: Date;
        notes: string | null;
        fromUserId: string;
        toUserId: string;
    })[]>;
    createDelegation(tenantId: string, fromUserId: string, data: {
        toUserId: string;
        startDate: Date;
        endDate: Date;
        notes?: string;
    }): Promise<{
        toUser: {
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
        isActive: boolean;
        createdAt: Date;
        startDate: Date;
        endDate: Date;
        notes: string | null;
        fromUserId: string;
        toUserId: string;
    }>;
    updateDelegation(tenantId: string, id: string, fromUserId: string, data: {
        toUserId?: string;
        startDate?: Date;
        endDate?: Date;
        isActive?: boolean;
        notes?: string;
    }): Promise<{
        toUser: {
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
        isActive: boolean;
        createdAt: Date;
        startDate: Date;
        endDate: Date;
        notes: string | null;
        fromUserId: string;
        toUserId: string;
    }>;
    deleteDelegation(tenantId: string, id: string, fromUserId: string): Promise<void>;
    getApprovalHistory(tenantId: string, docType: string, docId: string): Promise<({
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
    })[]>;
    getOverdueInstances(tenantId: string): Promise<({
        definition: {
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
    })[]>;
    private updateDocumentStatus;
}
