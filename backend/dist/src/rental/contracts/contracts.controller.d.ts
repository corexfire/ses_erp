import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class RentalContractsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    findAll(req: FastifyRequest, search?: string, status?: string): Promise<{
        data: ({
            customer: {
                name: string;
                code: string;
            };
            asset: {
                assetNo: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            customerId: string;
            status: string;
            notes: string | null;
            billingCycle: string;
            assetId: string | null;
            assetDescription: string | null;
            contractNo: string;
            rentalRate: import("@prisma/client-runtime-utils").Decimal;
            depositAmount: import("@prisma/client-runtime-utils").Decimal;
        })[];
        summary: {
            active: number;
            completed: number;
            terminated: number;
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
            customerId: string;
            status: string;
            notes: string | null;
            billingCycle: string;
            assetId: string | null;
            assetDescription: string | null;
            contractNo: string;
            rentalRate: import("@prisma/client-runtime-utils").Decimal;
            depositAmount: import("@prisma/client-runtime-utils").Decimal;
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
            customerId: string;
            status: string;
            notes: string | null;
            billingCycle: string;
            assetId: string | null;
            assetDescription: string | null;
            contractNo: string;
            rentalRate: import("@prisma/client-runtime-utils").Decimal;
            depositAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    getAssets(req: FastifyRequest): Promise<{
        data: {
            id: string;
            assetNo: string;
        }[];
    }>;
}
