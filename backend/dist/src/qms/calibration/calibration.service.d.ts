import { PrismaService } from '../../prisma/prisma.service';
export declare class CalibrationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, filters: any): Promise<({
        equipment: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string | null;
            status: string;
            notes: string | null;
            manufacturer: string | null;
            location: string | null;
            installedDate: Date | null;
            serialNumber: string | null;
            model: string | null;
            criticality: string;
            purchaseDate: Date | null;
            warrantyExpiryDate: Date | null;
            workCenterId: string | null;
        };
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        result: string;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.CalibrationStatus;
        notes: string | null;
        expiryDate: Date;
        equipmentId: string;
        calibrationDate: Date;
        provider: string;
        certificateNo: string | null;
        certificateUrl: string | null;
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        equipment: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string | null;
            status: string;
            notes: string | null;
            manufacturer: string | null;
            location: string | null;
            installedDate: Date | null;
            serialNumber: string | null;
            model: string | null;
            criticality: string;
            purchaseDate: Date | null;
            warrantyExpiryDate: Date | null;
            workCenterId: string | null;
        };
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        result: string;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.CalibrationStatus;
        notes: string | null;
        expiryDate: Date;
        equipmentId: string;
        calibrationDate: Date;
        provider: string;
        certificateNo: string | null;
        certificateUrl: string | null;
    }>;
    searchEquipment(tenantId: string, q?: string): Promise<{
        id: string;
        name: string;
        code: string;
        serialNumber: string | null;
    }[]>;
    create(tenantId: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        result: string;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.CalibrationStatus;
        notes: string | null;
        expiryDate: Date;
        equipmentId: string;
        calibrationDate: Date;
        provider: string;
        certificateNo: string | null;
        certificateUrl: string | null;
    }>;
    update(tenantId: string, id: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        result: string;
        updatedAt: Date;
        status: import("prisma/generated").$Enums.CalibrationStatus;
        notes: string | null;
        expiryDate: Date;
        equipmentId: string;
        calibrationDate: Date;
        provider: string;
        certificateNo: string | null;
        certificateUrl: string | null;
    }>;
}
