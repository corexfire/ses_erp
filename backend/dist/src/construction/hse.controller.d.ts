import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class HseController {
    private prisma;
    private notification;
    constructor(prisma: PrismaService, notification: NotificationService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string, type?: string, category?: string): Promise<{
        data: ({
            project: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                customerId: string | null;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            status: string;
            inspectionDate: Date;
            summary: string | null;
            findings: string | null;
            projectId: string;
            score: import("@prisma/client-runtime-utils").Decimal | null;
            inspectorId: string | null;
            attachments: import("prisma/generated/runtime/client").JsonValue | null;
        })[];
    } | {
        data: ({
            project: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                customerId: string | null;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            type: string;
            status: string;
            severity: string;
            rootCause: string | null;
            reportedBy: string | null;
            location: string | null;
            projectId: string;
            attachments: import("prisma/generated/runtime/client").JsonValue | null;
            incidentDate: Date;
            actionTaken: string | null;
        })[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        totalIncidents: number;
        openIncidents: number;
        avgScore: number;
        fatalCount: number;
        safeManHours: number;
    }>;
    createIncident(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string;
        updatedAt: Date;
        type: string;
        status: string;
        severity: string;
        rootCause: string | null;
        reportedBy: string | null;
        location: string | null;
        projectId: string;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
        incidentDate: Date;
        actionTaken: string | null;
    }>;
    createInspection(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        inspectionDate: Date;
        summary: string | null;
        findings: string | null;
        projectId: string;
        score: import("@prisma/client-runtime-utils").Decimal | null;
        inspectorId: string | null;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
    updateIncident(id: string, body: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string;
        updatedAt: Date;
        type: string;
        status: string;
        severity: string;
        rootCause: string | null;
        reportedBy: string | null;
        location: string | null;
        projectId: string;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
        incidentDate: Date;
        actionTaken: string | null;
    }>;
    updateInspection(id: string, body: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        inspectionDate: Date;
        summary: string | null;
        findings: string | null;
        projectId: string;
        score: import("@prisma/client-runtime-utils").Decimal | null;
        inspectorId: string | null;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
    removeIncident(id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string;
        updatedAt: Date;
        type: string;
        status: string;
        severity: string;
        rootCause: string | null;
        reportedBy: string | null;
        location: string | null;
        projectId: string;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
        incidentDate: Date;
        actionTaken: string | null;
    }>;
    removeInspection(id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        inspectionDate: Date;
        summary: string | null;
        findings: string | null;
        projectId: string;
        score: import("@prisma/client-runtime-utils").Decimal | null;
        inspectorId: string | null;
        attachments: import("prisma/generated/runtime/client").JsonValue | null;
    }>;
}
