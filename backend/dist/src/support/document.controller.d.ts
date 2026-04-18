import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class CreateDocumentDto {
    code: string;
    title: string;
    description?: string;
    category: string;
    version: string;
    status?: string;
    authorId?: string;
    departmentId?: string;
    effectiveDate?: string;
    expiryDate?: string;
    fileUrl?: string;
}
export declare class SupportDocumentController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listDocuments(req: FastifyRequest & {
        user: AuthUser;
    }, category?: string, status?: string): Promise<({
        department: {
            name: string;
            code: string;
        } | null;
        author: {
            employeeNo: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: string;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        authorId: string | null;
        departmentId: string | null;
    })[]>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        published: number;
        underReview: number;
        expiringSoon: number;
        expired: number;
    }>;
    getDocument(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
        department: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            code: string;
            type: string;
            parentId: string | null;
            managerId: string | null;
        } | null;
        author: {
            id: string;
            email: string;
            tenantId: string;
            createdAt: Date;
            phone: string | null;
            updatedAt: Date;
            status: string;
            department: string | null;
            managerId: string | null;
            employeeNo: string;
            firstName: string;
            lastName: string | null;
            position: string | null;
            hireDate: Date | null;
            salary: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: string;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        authorId: string | null;
        departmentId: string | null;
    }) | null>;
    createDocument(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDocumentDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: string;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        authorId: string | null;
        departmentId: string | null;
    }>;
    updateDocument(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateDocumentDto>): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: string;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        authorId: string | null;
        departmentId: string | null;
    }>;
    deleteDocument(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        effectiveDate: Date | null;
        status: string;
        expiryDate: Date | null;
        title: string;
        category: string;
        version: string;
        fileUrl: string | null;
        authorId: string | null;
        departmentId: string | null;
    }>;
}
export {};
