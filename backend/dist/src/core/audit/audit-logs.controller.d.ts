import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditLogsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, take?: string): Promise<{
        auditLogs: {
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
}
