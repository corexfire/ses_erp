import { PrismaClient } from './generated/client';
export declare function seedWorkflowInstances(prisma: PrismaClient, tenantId: string): Promise<void>;
