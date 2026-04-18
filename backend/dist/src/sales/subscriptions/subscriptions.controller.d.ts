import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class SubscriptionsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    findAll(req: FastifyRequest, search?: string, status?: string): Promise<{
        data: ({
            customer: {
                name: string;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            status: string;
            customerId: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            planName: string;
            billingCycle: string;
            nextBillingDate: Date;
        })[];
        summary: {
            active: number;
            pastDue: number;
            cancelled: number;
        };
    }>;
    create(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            status: string;
            customerId: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            planName: string;
            billingCycle: string;
            nextBillingDate: Date;
        };
    }>;
    update(req: FastifyRequest, id: string, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            status: string;
            customerId: string;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            planName: string;
            billingCycle: string;
            nextBillingDate: Date;
        };
    }>;
}
