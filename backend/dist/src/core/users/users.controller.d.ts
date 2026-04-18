import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        users: {
            id: string;
            email: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            roles: ({
                role: {
                    id: string;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                };
            } & {
                userId: string;
                roleId: string;
            })[];
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateUserDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        name?: string;
        email?: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    assignRole(req: FastifyRequest & {
        user: AuthUser;
    }, userId: string, body: AssignRoleDto): Promise<{
        userRole: {
            userId: string;
            roleId: string;
        };
    }>;
    removeRole(req: FastifyRequest & {
        user: AuthUser;
    }, userId: string, roleId: string): Promise<{
        ok: boolean;
    }>;
}
