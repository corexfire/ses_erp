import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class CreateComplianceDto {
    code: string;
    title: string;
    type: string;
    category: string;
    issuingBody?: string;
    status?: string;
    effectiveDate?: string;
    expiryDate?: string;
    lastAuditDate?: string;
    nextAuditDate?: string;
    riskLevel?: string;
    ownerId?: string;
    departmentId?: string;
    documentId?: string;
    description?: string;
    notes?: string;
}
export declare class SupportComplianceController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listCompliance(req: FastifyRequest & {
        user: AuthUser;
    }, type?: string, status?: string, riskLevel?: string): Promise<({
        owner: {
            employeeNo: string;
            firstName: string;
            lastName: string | null;
        } | null;
        department: {
            name: string;
            code: string;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        type: string;
        effectiveDate: Date | null;
        status: string;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        ownerId: string | null;
        departmentId: string | null;
        issuingBody: string | null;
        lastAuditDate: Date | null;
        nextAuditDate: Date | null;
        riskLevel: string;
        documentId: string | null;
    })[]>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        active: number;
        expiringSoon: number;
        expired: number;
        highRisk: number;
    }>;
    getRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
        owner: {
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
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        type: string;
        effectiveDate: Date | null;
        status: string;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        ownerId: string | null;
        departmentId: string | null;
        issuingBody: string | null;
        lastAuditDate: Date | null;
        nextAuditDate: Date | null;
        riskLevel: string;
        documentId: string | null;
    }) | null>;
    createRecord(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateComplianceDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        type: string;
        effectiveDate: Date | null;
        status: string;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        ownerId: string | null;
        departmentId: string | null;
        issuingBody: string | null;
        lastAuditDate: Date | null;
        nextAuditDate: Date | null;
        riskLevel: string;
        documentId: string | null;
    }>;
    updateRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateComplianceDto>): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        type: string;
        effectiveDate: Date | null;
        status: string;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        ownerId: string | null;
        departmentId: string | null;
        issuingBody: string | null;
        lastAuditDate: Date | null;
        nextAuditDate: Date | null;
        riskLevel: string;
        documentId: string | null;
    }>;
    deleteRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        code: string;
        type: string;
        effectiveDate: Date | null;
        status: string;
        notes: string | null;
        expiryDate: Date | null;
        title: string;
        category: string;
        ownerId: string | null;
        departmentId: string | null;
        issuingBody: string | null;
        lastAuditDate: Date | null;
        nextAuditDate: Date | null;
        riskLevel: string;
        documentId: string | null;
    }>;
}
export {};
