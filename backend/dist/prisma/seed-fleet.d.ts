import type { PrismaClient } from './generated/client';
export declare function seedFleet(prisma: PrismaClient, tenantId: string): Promise<void>;
