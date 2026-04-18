import { PrismaClient } from './generated/client';
export declare function seedCurrency(prisma: PrismaClient, tenantId: string): Promise<void>;
