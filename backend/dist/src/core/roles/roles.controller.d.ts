import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';
export declare class RolesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        roles: ({
            permissions: ({
                permission: {
                    id: string;
                    key: string;
                };
            } & {
                roleId: string;
                permissionId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateRoleDto): Promise<{
        role: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
        };
    }>;
    getRolePermissions(req: FastifyRequest & {
        user: AuthUser;
    }, roleId: string): Promise<{
        role: {
            id: string;
            permissions: {
                permission: {
                    id: string;
                    key: string;
                };
            }[];
        } | null;
    }>;
    setRolePermissions(req: FastifyRequest & {
        user: AuthUser;
    }, roleId: string, body: UpdateRolePermissionsDto): Promise<{
        ok: boolean;
    }>;
}
