import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class PaymentRequestController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        requests: ({
            supplier: {
                id: string;
                name: string;
                code: string;
            } | null;
            project: {
                id: string;
                name: string;
                code: string;
            } | null;
            invoice: {
                id: string;
                code: string;
                balanceDue: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            requester: {
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
            status: string;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string | null;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
            projectId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        request: ({
            supplier: {
                id: string;
                name: string;
                code: string;
            } | null;
            project: {
                id: string;
                name: string;
                code: string;
            } | null;
            invoice: {
                id: string;
                code: string;
                balanceDue: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            requester: {
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
            status: string;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string | null;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
            projectId: string | null;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        requestNo: string;
        requestDate: string;
        requesterId?: string;
        supplierId?: string;
        projectId?: string;
        invoiceId?: string;
        description: string;
        amount: number;
    }): Promise<{
        request: {
            supplier: {
                name: string;
            } | null;
            project: {
                name: string;
            } | null;
            requester: {
                name: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            status: string;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string | null;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
            projectId: string | null;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            status: string;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string | null;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
            projectId: string | null;
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        reason?: string;
    }): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            status: string;
            invoiceId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            supplierId: string | null;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
            projectId: string | null;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
