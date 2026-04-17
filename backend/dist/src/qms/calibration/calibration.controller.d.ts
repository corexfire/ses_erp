import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../../auth/auth.types';
import { CalibrationService } from './calibration.service';
export declare class CalibrationController {
    private readonly calibrationService;
    constructor(calibrationService: CalibrationService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, query: any): Promise<{
        list: ({
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
        })[];
    }>;
    searchEquipment(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
            serialNumber: string | null;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        log: {
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        log: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        log: {
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
        };
    }>;
}
