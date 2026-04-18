import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class KpiController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        evaluations: ({
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
            comments: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            period: string;
            grade: string | null;
            employeeId: string;
            score: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        employeeId: string;
        period: string;
        score: number;
        grade?: string;
        comments?: string;
    }): Promise<{
        evaluation: {
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
            comments: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            period: string;
            grade: string | null;
            employeeId: string;
            score: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        evaluation: {
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
            comments: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            period: string;
            grade: string | null;
            employeeId: string;
            score: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
export declare class ExpenseController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        claims: ({
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
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            category: string;
            employeeId: string;
            claimNo: string;
            claimDate: Date;
            approvedBy: string | null;
            approvedAt: Date | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        claim: ({
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
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            category: string;
            employeeId: string;
            claimNo: string;
            claimDate: Date;
            approvedBy: string | null;
            approvedAt: Date | null;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        employeeId: string;
        claimNo: string;
        claimDate: string;
        amount: number;
        description?: string;
        category: string;
    }): Promise<{
        claim: {
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
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            category: string;
            employeeId: string;
            claimNo: string;
            claimDate: Date;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        claim: {
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
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            category: string;
            employeeId: string;
            claimNo: string;
            claimDate: Date;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        claim: {
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
            description: string | null;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            category: string;
            employeeId: string;
            claimNo: string;
            claimDate: Date;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
}
