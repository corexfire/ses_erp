import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeeController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, department?: string): Promise<{
        employees: ({
            manager: {
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
            reports: {
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
            }[];
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        employee: ({
            manager: {
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
            attendances: {
                id: string;
                tenantId: string;
                createdAt: Date;
                status: string;
                notes: string | null;
                employeeId: string;
                date: Date;
                checkIn: Date | null;
                checkOut: Date | null;
                workHours: import("@prisma/client-runtime-utils").Decimal | null;
            }[];
            reports: {
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
            }[];
        } & {
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
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        employeeNo: string;
        firstName: string;
        lastName?: string;
        email: string;
        phone?: string;
        department?: string;
        position?: string;
        hireDate?: string;
        salary?: number;
        managerId?: string;
    }): Promise<{
        employee: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        department?: string;
        position?: string;
        status?: string;
        salary?: number;
    }): Promise<{
        employee: {
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
        };
    }>;
    listMovements(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        movements: {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            effectiveDate: Date;
            reason: string | null;
            employeeId: string;
            fromDept: string | null;
            toDept: string | null;
            fromPos: string | null;
            toPos: string | null;
        }[];
    }>;
    createMovement(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        movement: {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            effectiveDate: Date;
            reason: string | null;
            employeeId: string;
            fromDept: string | null;
            toDept: string | null;
            fromPos: string | null;
            toPos: string | null;
        };
    }>;
    listDisciplinary(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        actions: {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            status: string;
            issueDate: Date;
            expiryDate: Date | null;
            reason: string | null;
            employeeId: string;
        }[];
    }>;
    createDisciplinary(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        action: {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            status: string;
            issueDate: Date;
            expiryDate: Date | null;
            reason: string | null;
            employeeId: string;
        };
    }>;
    calcTermination(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        serviceYears: string;
        salary: number;
        severance: number;
        servicePay: number;
        compensation: number;
        total: number;
    }>;
    terminate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        termination: {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            status: string;
            notes: string | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string;
            employeeId: string;
            terminationDate: Date;
            severanceAmount: import("@prisma/client-runtime-utils").Decimal;
            servicePayAmount: import("@prisma/client-runtime-utils").Decimal;
            compensationPayAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    listTerminations(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        terminations: ({
            employee: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            type: string;
            status: string;
            notes: string | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            reason: string;
            employeeId: string;
            terminationDate: Date;
            severanceAmount: import("@prisma/client-runtime-utils").Decimal;
            servicePayAmount: import("@prisma/client-runtime-utils").Decimal;
            compensationPayAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
}
export declare class OrgStructureController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        units: ({
            parent: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                code: string;
                type: string;
                parentId: string | null;
                managerId: string | null;
            } | null;
            children: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                code: string;
                type: string;
                parentId: string | null;
                managerId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            code: string;
            type: string;
            parentId: string | null;
            managerId: string | null;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        name: string;
        code: string;
        parentId?: string;
        managerId?: string;
        type?: string;
    }): Promise<{
        unit: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            code: string;
            type: string;
            parentId: string | null;
            managerId: string | null;
        };
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        unit: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            code: string;
            type: string;
            parentId: string | null;
            managerId: string | null;
        } | null;
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        name?: string;
        code?: string;
        parentId?: string;
        managerId?: string;
        type?: string;
    }): Promise<{
        unit: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            code: string;
            type: string;
            parentId: string | null;
            managerId: string | null;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
export declare class RecruitmentController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        candidates: {
            id: string;
            email: string;
            tenantId: string;
            createdAt: Date;
            phone: string | null;
            status: string;
            firstName: string;
            lastName: string | null;
            position: string | null;
            candidateNo: string;
            appliedAt: Date;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        candidateNo: string;
        firstName: string;
        lastName?: string;
        email: string;
        phone?: string;
        position?: string;
    }): Promise<{
        candidate: {
            id: string;
            email: string;
            tenantId: string;
            createdAt: Date;
            phone: string | null;
            status: string;
            firstName: string;
            lastName: string | null;
            position: string | null;
            candidateNo: string;
            appliedAt: Date;
        };
    }>;
    advance(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        status: string;
    }): Promise<{
        candidate: {
            id: string;
            email: string;
            tenantId: string;
            createdAt: Date;
            phone: string | null;
            status: string;
            firstName: string;
            lastName: string | null;
            position: string | null;
            candidateNo: string;
            appliedAt: Date;
        };
    }>;
}
