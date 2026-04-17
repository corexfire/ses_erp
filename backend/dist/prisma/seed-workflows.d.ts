import { PrismaClient } from './generated/client';
export declare function seedWorkflows(prisma: PrismaClient, tenantId: string): Promise<void>;
