import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class TeamController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listMyTeams(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
        }[];
    }>;
    listAll(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: ({
            members: ({
                user: {
                    id: string;
                    email: string;
                    tenantId: string;
                    name: string | null;
                    passwordHash: string;
                    isActive: boolean;
                    createdAt: Date;
                    isSuperAdmin: boolean;
                };
            } & {
                role: string;
                id: string;
                tenantId: string;
                userId: string;
                teamId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        name: string;
        description?: string;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
        };
    }>;
    addMember(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        userId: string;
        role?: string;
    }): Promise<{
        data: {
            role: string;
            id: string;
            tenantId: string;
            userId: string;
            teamId: string;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        name?: string;
        description?: string;
    }): Promise<{
        data: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
    removeMember(req: FastifyRequest & {
        user: AuthUser;
    }, teamId: string, memberId: string): Promise<{
        success: boolean;
    }>;
}
