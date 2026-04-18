import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
export declare class AssetDisposalController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        disposals: ({
            asset: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            assetId: string;
            disposalDate: Date;
            disposalNo: string;
            saleValue: import("@prisma/client-runtime-utils").Decimal;
            lossGain: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        disposal: ({
            asset: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            assetId: string;
            disposalDate: Date;
            disposalNo: string;
            saleValue: import("@prisma/client-runtime-utils").Decimal;
            lossGain: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        assetId: string;
        disposalNo: string;
        disposalDate: string;
        saleValue: number;
        notes?: string;
    }): Promise<{
        disposal: {
            asset: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            assetId: string;
            disposalDate: Date;
            disposalNo: string;
            saleValue: import("@prisma/client-runtime-utils").Decimal;
            lossGain: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        disposal: {
            asset: {
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            notes: string | null;
            assetId: string;
            disposalDate: Date;
            disposalNo: string;
            saleValue: import("@prisma/client-runtime-utils").Decimal;
            lossGain: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
