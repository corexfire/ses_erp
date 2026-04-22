import { PrismaClient } from './generated/client';
export declare function seedPaymentRequests(prisma: PrismaClient, tenantId: string): Promise<void>;
