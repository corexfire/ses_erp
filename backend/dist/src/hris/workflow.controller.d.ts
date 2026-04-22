import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class HrisWorkflowController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listLeaves(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        leaves: ({
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
            startDate: Date;
            endDate: Date;
            status: string;
            reason: string | null;
            employeeId: string;
            approvedById: string | null;
            leaveType: string;
        })[];
    }>;
    createLeave(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        leave: {
            id: string;
            tenantId: string;
            createdAt: Date;
            startDate: Date;
            endDate: Date;
            status: string;
            reason: string | null;
            employeeId: string;
            approvedById: string | null;
            leaveType: string;
        };
    }>;
    updateLeaveStatus(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        status: string;
    }): Promise<{
        leave: {
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
            startDate: Date;
            endDate: Date;
            status: string;
            reason: string | null;
            employeeId: string;
            approvedById: string | null;
            leaveType: string;
        };
    }>;
    listBalances(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        balances: ({
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
            period: string;
            employeeId: string;
            leaveType: string;
            allowance: number;
            used: number;
        })[];
    }>;
    initBalances(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        success: boolean;
        count: number;
    }>;
    listOvertime(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        overtimes: ({
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
            hours: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            reason: string | null;
            employeeId: string;
            date: Date;
            approvedById: string | null;
        })[];
    }>;
    createOvertime(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        overtime: {
            id: string;
            tenantId: string;
            createdAt: Date;
            hours: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            reason: string | null;
            employeeId: string;
            date: Date;
            approvedById: string | null;
        };
    }>;
    updateOvertimeStatus(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        status: string;
    }): Promise<{
        overtime: {
            id: string;
            tenantId: string;
            createdAt: Date;
            hours: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            reason: string | null;
            employeeId: string;
            date: Date;
            approvedById: string | null;
        };
    }>;
}
