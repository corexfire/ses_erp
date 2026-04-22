import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class HrisFinancialController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listLoans(req: FastifyRequest & {
        user: AuthUser;
    }, employeeId?: string): Promise<{
        loans: ({
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
            installments: {
                id: string;
                tenantId: string;
                status: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date;
                paidDate: Date | null;
                loanId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
            employeeId: string;
        })[];
    }>;
    createLoan(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        loan: {
            installments: {
                id: string;
                tenantId: string;
                status: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date;
                paidDate: Date | null;
                loanId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            reason: string | null;
            employeeId: string;
        };
    }>;
    updateInstallment(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        status: string;
        paidDate?: string;
    }): Promise<{
        installment: {
            id: string;
            tenantId: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            paidDate: Date | null;
            loanId: string;
        };
    }>;
}
