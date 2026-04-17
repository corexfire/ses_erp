import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEquipmentDto, CreateMaintenanceScheduleDto, CreateMaintenanceRequestDto, UpdateMaintenanceRequestDto, CreateMaintenanceLogDto } from './dto/maintenance.dto';
export declare class MaintenanceController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listEquipment(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        equipment: ({
            maintenanceRequests: {
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: string;
                updatedAt: Date;
                code: string;
                assignedTo: string | null;
                status: string;
                notes: string | null;
                requestDate: Date;
                equipmentId: string;
                problem: string;
                resolvedDate: Date | null;
            }[];
            maintenancePlans: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                equipmentId: string;
                frequency: string;
                intervalDays: number;
                nextDate: Date;
                lastDate: Date | null;
            }[];
        } & {
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
        })[];
    }>;
    createEquipment(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateEquipmentDto): Promise<{
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
    }>;
    updateEquipment(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: Partial<CreateEquipmentDto>): Promise<{
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
    }>;
    listSchedules(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        schedules: ({
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
            maintenanceTasks: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string;
                scheduleId: string;
                isMandatory: boolean;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            equipmentId: string;
            frequency: string;
            intervalDays: number;
            nextDate: Date;
            lastDate: Date | null;
        })[];
    }>;
    createSchedule(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateMaintenanceScheduleDto): Promise<{
        schedule: {
            maintenanceTasks: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string;
                scheduleId: string;
                isMandatory: boolean;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            equipmentId: string;
            frequency: string;
            intervalDays: number;
            nextDate: Date;
            lastDate: Date | null;
        };
    }>;
    listRequests(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        requests: ({
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
            priority: string;
            updatedAt: Date;
            code: string;
            assignedTo: string | null;
            status: string;
            notes: string | null;
            requestDate: Date;
            equipmentId: string;
            problem: string;
            resolvedDate: Date | null;
        })[];
    }>;
    createRequest(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateMaintenanceRequestDto): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            code: string;
            assignedTo: string | null;
            status: string;
            notes: string | null;
            requestDate: Date;
            equipmentId: string;
            problem: string;
            resolvedDate: Date | null;
        };
    }>;
    updateRequest(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateMaintenanceRequestDto): Promise<{
        request: {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            code: string;
            assignedTo: string | null;
            status: string;
            notes: string | null;
            requestDate: Date;
            equipmentId: string;
            problem: string;
            resolvedDate: Date | null;
        };
    }>;
    listLogs(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        logs: ({
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
            parts: ({
                item: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                    code: string;
                    itemGroupId: string | null;
                    baseUomCode: string | null;
                    trackingType: import("prisma/generated").$Enums.ItemTrackingType;
                    valuationMethod: import("prisma/generated").$Enums.ValuationMethod;
                    reorderPoint: import("@prisma/client-runtime-utils").Decimal | null;
                    reorderQty: import("@prisma/client-runtime-utils").Decimal | null;
                    isPurchaseItem: boolean;
                    isSalesItem: boolean;
                    purchaseTaxCodeId: string | null;
                    salesTaxCodeId: string | null;
                    brand: string | null;
                    isSparePart: boolean;
                    manufacturer: string | null;
                    oemPartNumber: string | null;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                itemId: string;
                unitCost: import("@prisma/client-runtime-utils").Decimal;
                totalCost: import("@prisma/client-runtime-utils").Decimal;
                qtyUsed: import("@prisma/client-runtime-utils").Decimal;
                maintenanceLogId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            status: string;
            totalCost: import("@prisma/client-runtime-utils").Decimal;
            equipmentId: string;
            requestId: string | null;
            scheduleId: string | null;
            technicianName: string;
            workType: string;
            durationMin: number;
            laborCost: import("@prisma/client-runtime-utils").Decimal;
            logDate: Date;
            partsCost: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    createLog(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateMaintenanceLogDto): Promise<{
        log: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            updatedAt: Date;
            status: string;
            totalCost: import("@prisma/client-runtime-utils").Decimal;
            equipmentId: string;
            requestId: string | null;
            scheduleId: string | null;
            technicianName: string;
            workType: string;
            durationMin: number;
            laborCost: import("@prisma/client-runtime-utils").Decimal;
            logDate: Date;
            partsCost: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
