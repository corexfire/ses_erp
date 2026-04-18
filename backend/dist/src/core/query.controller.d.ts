import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class QueryController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    query(req: FastifyRequest & {
        user: AuthUser;
    }, table: string, include?: string, take?: string, skip?: string, search?: string, searchField?: string, sortField?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: any;
    }>;
    private parseInclude;
}
