import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CoaController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, type?: string): Promise<{
        accounts: ({
            parent: {
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
            } | null;
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        account: ({
            parent: {
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
            } | null;
            children: {
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
        } & {
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
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        code: string;
        name: string;
        type: string;
        parentId?: string;
        isPosting?: boolean;
    }): Promise<{
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
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        name?: string;
        isActive?: boolean;
        isPosting?: boolean;
    }): Promise<{
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
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
