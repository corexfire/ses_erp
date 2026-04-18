import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreateWavePickingDto {
    warehouseId: string;
    plannedDate: string;
    deliveryOrderIds: string[];
    notes?: string;
}
export declare class CreateStagingLoadDto {
    waveId?: string;
    tripPlanId?: string;
    warehouseId: string;
}
export declare class WarehouseController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listWaves(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string, warehouseId?: string): Promise<{
        waves: ({
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.WavePickingStatus;
            assignedTo: string | null;
            notes: string | null;
            warehouseId: string;
            plannedDate: Date;
            totalDoCount: number;
            totalItemCount: number;
        })[];
    }>;
    getWave(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        wave: {
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.WavePickingStatus;
            assignedTo: string | null;
            notes: string | null;
            warehouseId: string;
            plannedDate: Date;
            totalDoCount: number;
            totalItemCount: number;
        };
        deliveryOrders: ({
            customer: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                nik: string | null;
                taxAddress: string | null;
            };
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                serialNo: string | null;
                pickedQty: import("@prisma/client-runtime-utils").Decimal;
                batchNo: string | null;
                deliveryOrderId: string;
                orderedQty: import("@prisma/client-runtime-utils").Decimal;
                packedQty: import("@prisma/client-runtime-utils").Decimal;
                shippedQty: import("@prisma/client-runtime-utils").Decimal;
                deliveredQty: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: import("prisma/generated").$Enums.DeliveryPriority;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.DeliveryOrderStatus;
            customerId: string;
            warehouseId: string;
            salesOrderId: string | null;
            shipmentId: string | null;
            tripPlanId: string | null;
            plannedShipDate: Date | null;
            actualShipDate: Date | null;
            deliveryAddress1: string | null;
            deliveryAddress2: string | null;
            deliveryCity: string | null;
            deliveryProvince: string | null;
            deliveryPostalCode: string | null;
            deliveryNotes: string | null;
            actualDeliveredAt: Date | null;
            podToken: string | null;
            podTokenExpiry: Date | null;
        })[];
    }>;
    createWave(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateWavePickingDto): Promise<{
        wave: {
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.WavePickingStatus;
            assignedTo: string | null;
            notes: string | null;
            warehouseId: string;
            plannedDate: Date;
            totalDoCount: number;
            totalItemCount: number;
        };
    }>;
    releaseWave(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        wave: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.WavePickingStatus;
            assignedTo: string | null;
            notes: string | null;
            warehouseId: string;
            plannedDate: Date;
            totalDoCount: number;
            totalItemCount: number;
        };
    }>;
    completePicking(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        wave: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.WavePickingStatus;
            assignedTo: string | null;
            notes: string | null;
            warehouseId: string;
            plannedDate: Date;
            totalDoCount: number;
            totalItemCount: number;
        };
    }>;
    listStaging(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        stagings: ({
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            status: string;
            notes: string | null;
            warehouseId: string;
            tripPlanId: string | null;
            waveId: string | null;
            loadedAt: Date | null;
        })[];
    }>;
    createStaging(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateStagingLoadDto): Promise<{
        staging: {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            status: string;
            notes: string | null;
            warehouseId: string;
            tripPlanId: string | null;
            waveId: string | null;
            loadedAt: Date | null;
        };
    }>;
    confirmStaging(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        staging: {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            status: string;
            notes: string | null;
            warehouseId: string;
            tripPlanId: string | null;
            waveId: string | null;
            loadedAt: Date | null;
        };
    }>;
    getStaging(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        staging: {
            warehouse: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                address1: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.WarehouseType;
                managerId: string | null;
                capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            code: string;
            status: string;
            notes: string | null;
            warehouseId: string;
            tripPlanId: string | null;
            waveId: string | null;
            loadedAt: Date | null;
        };
    }>;
    confirmLoading(req: FastifyRequest & {
        user: AuthUser;
    }, tripId: string): Promise<{
        success: boolean;
    }>;
}
