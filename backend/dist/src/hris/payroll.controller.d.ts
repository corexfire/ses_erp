import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class PayrollController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period?: string): Promise<{
        runs: ({
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
            status: string;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            period: string;
            employeeId: string;
            basicSalary: import("@prisma/client-runtime-utils").Decimal;
            allowances: import("@prisma/client-runtime-utils").Decimal;
            deductions: import("@prisma/client-runtime-utils").Decimal;
            grossPay: import("@prisma/client-runtime-utils").Decimal;
            netPay: import("@prisma/client-runtime-utils").Decimal;
            payDate: Date | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        run: ({
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
            status: string;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            period: string;
            employeeId: string;
            basicSalary: import("@prisma/client-runtime-utils").Decimal;
            allowances: import("@prisma/client-runtime-utils").Decimal;
            deductions: import("@prisma/client-runtime-utils").Decimal;
            grossPay: import("@prisma/client-runtime-utils").Decimal;
            netPay: import("@prisma/client-runtime-utils").Decimal;
            payDate: Date | null;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        employeeId: string;
        period: string;
        basicSalary: number;
        allowances?: number;
        deductions?: number;
        taxAmount?: number;
    }): Promise<{
        run: {
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
            status: string;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            period: string;
            employeeId: string;
            basicSalary: import("@prisma/client-runtime-utils").Decimal;
            allowances: import("@prisma/client-runtime-utils").Decimal;
            deductions: import("@prisma/client-runtime-utils").Decimal;
            grossPay: import("@prisma/client-runtime-utils").Decimal;
            netPay: import("@prisma/client-runtime-utils").Decimal;
            payDate: Date | null;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        payDate: string;
    }): Promise<{
        run: {
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
            status: string;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            period: string;
            employeeId: string;
            basicSalary: import("@prisma/client-runtime-utils").Decimal;
            allowances: import("@prisma/client-runtime-utils").Decimal;
            deductions: import("@prisma/client-runtime-utils").Decimal;
            grossPay: import("@prisma/client-runtime-utils").Decimal;
            netPay: import("@prisma/client-runtime-utils").Decimal;
            payDate: Date | null;
        };
    }>;
}
export declare class ESSController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    profile(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        employees: ({
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
    myAttendance(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    myPayroll(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        runs: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            period: string;
            employeeId: string;
            basicSalary: import("@prisma/client-runtime-utils").Decimal;
            allowances: import("@prisma/client-runtime-utils").Decimal;
            deductions: import("@prisma/client-runtime-utils").Decimal;
            grossPay: import("@prisma/client-runtime-utils").Decimal;
            netPay: import("@prisma/client-runtime-utils").Decimal;
            payDate: Date | null;
        }[];
    }>;
}
