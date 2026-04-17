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
        requests: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
        } | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        requestNo: string;
        requestDate: string;
        requesterId: string;
        description: string;
        amount: number;
    }): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
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
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
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
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            requestDate: Date;
            requestNo: string;
            requesterId: string;
            approvalStatus: string;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
