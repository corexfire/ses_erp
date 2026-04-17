import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class RentalBillingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    findAll(req: FastifyRequest, search?: string, status?: string): Promise<{
        data: ({
            customer: {
                name: string;
                code: string;
            };
            contract: {
                contractNo: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            periodStart: Date;
            periodEnd: Date;
            billingNo: string;
            contractId: string;
        })[];
        summary: {
            unpaid: number | import("@prisma/client-runtime-utils").Decimal;
            paid: number | import("@prisma/client-runtime-utils").Decimal;
            overdue: number | import("@prisma/client-runtime-utils").Decimal;
            count: number;
        };
    }>;
    create(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            periodStart: Date;
            periodEnd: Date;
            billingNo: string;
            contractId: string;
        };
    }>;
    update(req: FastifyRequest, id: string, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            status: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            periodStart: Date;
            periodEnd: Date;
            billingNo: string;
            contractId: string;
        };
    }>;
    getContracts(req: FastifyRequest): Promise<{
        data: {
            id: string;
            billingCycle: string;
            contractNo: string;
            rentalRate: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
}
