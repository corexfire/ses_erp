import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, date?: string): Promise<{
        attendances: ({
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
            notes: string | null;
            employeeId: string;
            date: Date;
            checkIn: Date | null;
            checkOut: Date | null;
            workHours: import("@prisma/client-runtime-utils").Decimal | null;
        })[];
    }>;
    summary(req: FastifyRequest & {
        user: AuthUser;
    }, startDate: string, endDate: string): Promise<{
        attendances: ({
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
            notes: string | null;
            employeeId: string;
            date: Date;
            checkIn: Date | null;
            checkOut: Date | null;
            workHours: import("@prisma/client-runtime-utils").Decimal | null;
        })[];
        summary: {
            present: number;
            absent: number;
            late: number;
            leave: number;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        employeeId: string;
        date: string;
        checkIn?: string;
        checkOut?: string;
        status?: string;
        notes?: string;
    }): Promise<{
        attendance: {
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
            notes: string | null;
            employeeId: string;
            date: Date;
            checkIn: Date | null;
            checkOut: Date | null;
            workHours: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
}
export declare class ShiftController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        shifts: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            code: string;
            startTime: string;
            endTime: string;
            isFlexi: boolean;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        name: string;
        code: string;
        startTime: string;
        endTime: string;
        isFlexi?: boolean;
    }): Promise<{
        shift: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            code: string;
            startTime: string;
            endTime: string;
            isFlexi: boolean;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        isActive?: boolean;
    }): Promise<{
        shift: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            code: string;
            startTime: string;
            endTime: string;
            isFlexi: boolean;
        };
    }>;
}
