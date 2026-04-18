import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ValuationController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private activeJobs;
    getValuation(req: FastifyRequest & {
        user: AuthUser;
    }, warehouseId?: string, itemId?: string): Promise<{
        valuation: {
            itemId: any;
            itemCode: any;
            itemName: any;
            currentQty: number;
            unitCost: number;
            totalValue: number;
            valuationMethod: any;
        }[];
        grandTotal: number;
    }>;
    getValuationByWarehouse(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        warehouses: {
            warehouseId: string;
            warehouseCode: string;
            warehouseName: string;
            currentQty: number;
        }[];
    }>;
    recalculate(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        jobId: string;
        message: string;
    }>;
    getJobStatus(jobId: string): Promise<{
        progress: number;
        status: string;
    }>;
    getLayers(req: FastifyRequest & {
        user: AuthUser;
    }, itemId?: string, take?: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            qty: import("@prisma/client-runtime-utils").Decimal;
            itemId: string | null;
            refType: string;
            refId: string;
            postingDate: Date;
            unitCost: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    private processRecalculation;
}
