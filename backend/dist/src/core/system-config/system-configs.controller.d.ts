import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertSystemConfigDto } from './dto/upsert-system-config.dto';
import { AuditService } from '../../audit/audit.service';
export declare class SystemConfigsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        configs: {
            id: string;
            tenantId: string;
            createdAt: Date;
            key: string;
            description: string | null;
            value: string;
            updatedAt: Date;
            status: string;
            group: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, key: string): Promise<{
        config: {
            id: string;
            tenantId: string;
            createdAt: Date;
            key: string;
            description: string | null;
            value: string;
            updatedAt: Date;
            status: string;
            group: string;
        } | null;
    }>;
    upsert(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertSystemConfigDto): Promise<{
        config: {
            id: string;
            tenantId: string;
            createdAt: Date;
            key: string;
            description: string | null;
            value: string;
            updatedAt: Date;
            status: string;
            group: string;
        };
    }>;
    remove(req: FastifyRequest & {
        user: AuthUser;
    }, key: string): Promise<{
        success: boolean;
    }>;
}
