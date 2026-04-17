import { PrismaClient } from './generated/client';
export declare function seedUsers(prisma: PrismaClient, tenantId: string): Promise<void>;
