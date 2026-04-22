import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateSubcontractorDto {
    code: string;
    name: string;
    category?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    taxId?: string;
    isActive?: boolean;
}
export declare class SubcontractorController {
    private prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, category?: string, status?: string, q?: string): Promise<{
        data: {
            id: string;
            email: string | null;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            phone: string | null;
            updatedAt: Date;
            code: string;
            category: string | null;
            contactName: string | null;
            address: string | null;
            taxId: string | null;
        }[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        active: number;
        categoryCount: number;
        categories: {
            name: string;
            count: number;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSubcontractorDto): Promise<{
        id: string;
        email: string | null;
        tenantId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        phone: string | null;
        updatedAt: Date;
        code: string;
        category: string | null;
        contactName: string | null;
        address: string | null;
        taxId: string | null;
    }>;
    update(id: string, body: Partial<CreateSubcontractorDto>, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        email: string | null;
        tenantId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        phone: string | null;
        updatedAt: Date;
        code: string;
        category: string | null;
        contactName: string | null;
        address: string | null;
        taxId: string | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
