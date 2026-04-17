import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../../auth/auth.types';
import { CapaService } from './capa.service';
import { CreateCapaDto } from './dto/create-capa.dto';
import { UpdateCapaDto } from './dto/update-capa.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CapaController {
    private readonly capaService;
    private readonly prisma;
    constructor(capaService: CapaService, prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, query: any): Promise<{
        list: ({
            assignedTo: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            sourceNcr: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.CapaStatus;
            assignedToId: string | null;
            evidenceUrl: string | null;
            rootCause: string;
            sourceNcrId: string | null;
            correctiveAction: string;
            preventiveAction: string;
            targetDate: Date | null;
            findings: string | null;
        })[];
    }>;
    getAuditFindings(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        findings: {
            id: string;
            tenantId: string;
            createdAt: Date;
            actorUserId: string | null;
            action: string;
            entity: string;
            entityId: string | null;
            metadata: import("prisma/generated/runtime/client").JsonValue | null;
        }[];
    }>;
    getUsers(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        users: {
            id: string;
            email: string;
            name: string | null;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        capa: {
            assignedTo: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            sourceNcr: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.CapaStatus;
            assignedToId: string | null;
            evidenceUrl: string | null;
            rootCause: string;
            sourceNcrId: string | null;
            correctiveAction: string;
            preventiveAction: string;
            targetDate: Date | null;
            findings: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCapaDto): Promise<{
        capa: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.CapaStatus;
            assignedToId: string | null;
            evidenceUrl: string | null;
            rootCause: string;
            sourceNcrId: string | null;
            correctiveAction: string;
            preventiveAction: string;
            targetDate: Date | null;
            findings: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateCapaDto): Promise<{
        capa: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.CapaStatus;
            assignedToId: string | null;
            evidenceUrl: string | null;
            rootCause: string;
            sourceNcrId: string | null;
            correctiveAction: string;
            preventiveAction: string;
            targetDate: Date | null;
            findings: string | null;
        };
    }>;
}
