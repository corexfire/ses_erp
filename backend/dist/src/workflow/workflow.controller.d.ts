import type { FastifyRequest } from 'fastify';
import { WorkflowService } from './workflow.service';
import { AuthUser } from '../auth/auth.types';
export declare class WorkflowController {
    private readonly workflowService;
    constructor(workflowService: WorkflowService);
    getDefinitions(req: FastifyRequest & {
        user: AuthUser;
    }, moduleKey?: string, docType?: string): Promise<({
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
    getDefinitionById(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<({
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
    createDefinition(req: FastifyRequest & {
        user: AuthUser;
    }, data: {
        name: string;
        moduleKey: string;
        docType: string;
        steps: any[];
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
    updateDefinition(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, data: {
        name?: string;
        isActive?: boolean;
        steps?: any[];
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
    deleteDefinition(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<void>;
    triggerWorkflow(req: FastifyRequest & {
        user: AuthUser;
    }, data: {
        docType: string;
        docId: string;
        definitionId?: string;
    }): Promise<({
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
    getMyInbox(req: FastifyRequest & {
        user: AuthUser;
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
    getInstances(req: FastifyRequest & {
        user: AuthUser;
    }, docType?: string, docId?: string, status?: string, assignedToUserId?: string): Promise<({
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
    getInstanceById(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<({
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
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, data: {
        comment?: string;
    }): Promise<({
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
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, data: {
        comment?: string;
    }): Promise<({
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
    delegate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, data: {
        toUserId: string;
        comment?: string;
    }): Promise<({
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
    escalate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<({
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
    getDelegations(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
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
    createDelegation(req: FastifyRequest & {
        user: AuthUser;
    }, data: {
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
    updateDelegation(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, data: {
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
    deleteDelegation(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<void>;
    getApprovalHistory(req: FastifyRequest & {
        user: AuthUser;
    }, docType: string, docId: string): Promise<({
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
    getOverdueInstances(req: FastifyRequest & {
        user: AuthUser;
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
}
