import { PrismaClient } from './generated/client';
export declare function seedAuditLogs(prisma: PrismaClient, tenantId: string): Promise<void>;
