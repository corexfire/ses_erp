import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateTenderDto {
    title: string;
    projectId?: string;
    description?: string;
    submissionDeadline?: string;
}
export declare class TenderController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        data: ({
            project: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                startDate: Date | null;
                endDate: Date | null;
                customerId: string | null;
                status: string;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            status: string;
            title: string;
            projectId: string | null;
            submissionDeadline: Date | null;
            awardDate: Date | null;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTenderDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        title: string;
        projectId: string | null;
        submissionDeadline: Date | null;
        awardDate: Date | null;
    }>;
    get(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        title: string;
        projectId: string | null;
        submissionDeadline: Date | null;
        awardDate: Date | null;
    } | null>;
    submitBid(id: string, body: {
        supplierId: string;
        price: number;
        notes?: string;
    }, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        notes: string | null;
        supplierId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        tenderId: string;
    }>;
    update(id: string, body: Partial<CreateTenderDto>, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        title: string;
        projectId: string | null;
        submissionDeadline: Date | null;
        awardDate: Date | null;
    }>;
    award(id: string, body: {
        supplierId: string;
    }, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        status: string;
        title: string;
        projectId: string | null;
        submissionDeadline: Date | null;
        awardDate: Date | null;
    }>;
}
