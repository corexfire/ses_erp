import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AddWorkflowStepDto } from './dto/add-workflow-step.dto';
import { CreateWorkflowDefinitionDto } from './dto/create-workflow-definition.dto';
export declare class WorkflowsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        workflows: ({
            steps: ({
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
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateWorkflowDefinitionDto): Promise<{
        workflow: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            moduleKey: string;
            docType: string;
        };
    }>;
    addStep(req: FastifyRequest & {
        user: AuthUser;
    }, workflowId: string, body: AddWorkflowStepDto): Promise<{
        ok: boolean;
        step?: undefined;
    } | {
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
        ok?: undefined;
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        workflow: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            moduleKey: string;
            docType: string;
        };
    }>;
}
