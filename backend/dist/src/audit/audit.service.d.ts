import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../prisma/generated/client';
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    log(input: {
        tenantId: string;
        actorUserId?: string | null;
        action: string;
        entity: string;
        entityId?: string | null;
        metadata?: Prisma.InputJsonValue;
    }): Promise<void>;
}
