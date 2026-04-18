import { PrismaClient } from './generated/client';
export declare function seedTasks(prisma: PrismaClient, tenantId: string): Promise<void>;
