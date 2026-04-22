import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class CreateAssetDto {
    assetNo: string;
    name: string;
    category: string;
    purchaseDate: string;
    purchaseCost: number;
    usefulLife: number;
    brand?: string;
    model?: string;
    serialNumber?: string;
    locationId?: string;
    custodianId?: string;
    status?: string;
    warrantyExpiry?: string;
    insuranceExpiry?: string;
    insurancePolicy?: string;
    nextMaintenanceDate?: string;
}
export declare class AssetSupportController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listAssets(req: FastifyRequest & {
        user: AuthUser;
    }, category?: string, status?: string): Promise<({
        location: {
            name: string;
            siteCode: string;
        } | null;
        custodian: {
            employeeNo: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
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
    })[]>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        active: number;
        underMaintenance: number;
        maintenanceOverdue: number;
        totalCapex: number;
    }>;
    getAsset(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<({
        rentalContracts: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            status: string;
            customerId: string;
            notes: string | null;
            billingCycle: string;
            assetId: string | null;
            assetDescription: string | null;
            contractNo: string;
            rentalRate: import("@prisma/client-runtime-utils").Decimal;
            depositAmount: import("@prisma/client-runtime-utils").Decimal;
        }[];
        location: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            city: string | null;
            province: string | null;
            updatedAt: Date;
            status: string;
            projectId: string;
            contactName: string | null;
            address: string | null;
            siteCode: string;
            gpsCoords: string | null;
            contactPhone: string | null;
        } | null;
        custodian: {
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
        } | null;
        depreciationEntries: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            assetId: string;
            periodDate: Date;
            depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
            accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
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
    }) | null>;
    createAsset(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateAssetDto): Promise<{
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
    }>;
    updateAsset(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateAssetDto>): Promise<{
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
    }>;
    deleteAsset(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
}
export {};
