import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class HrisProductivityController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listTimesheets(req: FastifyRequest & {
        user: AuthUser;
    }, employeeId?: string, date?: string): Promise<{
        timesheets: ({
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
            project: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            hours: import("@prisma/client-runtime-utils").Decimal;
            description: string | null;
            employeeId: string;
            date: Date;
        })[];
    }>;
    createTimesheet(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        timesheet: {
            project: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            hours: import("@prisma/client-runtime-utils").Decimal;
            description: string | null;
            employeeId: string;
            date: Date;
        };
    }>;
    listDocuments(req: FastifyRequest & {
        user: AuthUser;
    }, employeeId?: string): Promise<{
        documents: ({
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
            name: string;
            createdAt: Date;
            type: string;
            expiryDate: Date | null;
            fileUrl: string;
            employeeId: string;
        })[];
    }>;
    createDocument(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        document: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            type: string;
            expiryDate: Date | null;
            fileUrl: string;
            employeeId: string;
        };
    }>;
}
