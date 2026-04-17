import { PrismaService } from '../../prisma/prisma.service';
import { CreateCapaDto } from './dto/create-capa.dto';
import { UpdateCapaDto } from './dto/update-capa.dto';
export declare class CapaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, filters: any): Promise<({
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
    })[]>;
    getAuditFindings(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        actorUserId: string | null;
        action: string;
        entity: string;
        entityId: string | null;
        metadata: import("prisma/generated/runtime/client").JsonValue | null;
    }[]>;
    findOne(tenantId: string, id: string): Promise<{
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
    }>;
    create(tenantId: string, dto: CreateCapaDto): Promise<{
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
    }>;
    update(tenantId: string, id: string, dto: UpdateCapaDto): Promise<{
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
    }>;
}
