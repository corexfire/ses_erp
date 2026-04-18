import { PrismaClient } from './generated/client';
export declare function seedRolesAndPermissions(prisma: PrismaClient, tenantId: string): Promise<void>;
