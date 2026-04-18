import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class RentalDepreciationController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    findAll(req: FastifyRequest, search?: string): Promise<{
        data: {
            accumulatedDepreciation: number;
            netBookValue: number;
            _count: {
                rentalContracts: number;
                rentalMaintenances: number;
            };
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            brand: string | null;
            category: string;
            serialNumber: string | null;
            model: string | null;
            purchaseDate: Date;
            assetNo: string;
            purchaseCost: import("@prisma/client-runtime-utils").Decimal;
            usefulLife: number;
            salvageValue: import("@prisma/client-runtime-utils").Decimal;
            depreciationMethod: string;
            locationId: string | null;
            custodianId: string | null;
            warrantyExpiry: Date | null;
            insurancePolicy: string | null;
            insuranceExpiry: Date | null;
            lastMaintenanceDate: Date | null;
            nextMaintenanceDate: Date | null;
        }[];
        summary: {
            totalAssets: number;
            totalCapital: number;
            totalAccumulated: number;
            netBookValue: number;
        };
    }>;
    getHistory(req: FastifyRequest, assetId: string): Promise<{
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            assetId: string;
            periodDate: Date;
            depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
            accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    logManualDepreciation(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            assetId: string;
            periodDate: Date;
            depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
            accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
