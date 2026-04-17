import { PrismaService } from '../../prisma/prisma.service';
export declare class PermissionsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        permissions: {
            id: string;
            createdAt: Date;
            key: string;
            description: string | null;
        }[];
    }>;
}
