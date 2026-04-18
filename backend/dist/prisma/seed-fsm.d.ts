import { PrismaClient } from './generated/client';
export declare function seedFsm(prisma: PrismaClient, tenantId: string): Promise<void>;
