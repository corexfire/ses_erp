import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCoaAccountDto } from './dto/create-coa-account.dto';
export declare class CoaController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        accounts: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.AccountType;
            parentId: string | null;
            isPosting: boolean;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCoaAccountDto): Promise<{
        account: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.AccountType;
            parentId: string | null;
            isPosting: boolean;
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        account: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.AccountType;
            parentId: string | null;
            isPosting: boolean;
        };
    }>;
}
