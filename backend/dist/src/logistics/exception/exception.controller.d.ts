import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreateExceptionDto {
    reason: string;
    description?: string;
}
export declare class ExceptionController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getByDeliveryOrder(req: FastifyRequest & {
        user: AuthUser;
    }, doId: string): Promise<{
        exceptions: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            reason: import("prisma/generated").$Enums.DeliveryExceptionReason;
            reportedBy: string | null;
            tripPlanId: string | null;
            deliveryOrderId: string;
            reportedAt: Date;
            resolved: boolean;
            resolvedAt: Date | null;
            resolutionNotes: string | null;
        }[];
    }>;
    getByTrip(req: FastifyRequest & {
        user: AuthUser;
    }, tripId: string): Promise<{
        exceptions: ({
            deliveryOrder: {
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
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: import("prisma/generated").$Enums.DeliveryPriority;
                updatedAt: Date;
                code: string;
                customerId: string;
                status: import("prisma/generated").$Enums.DeliveryOrderStatus;
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            reason: import("prisma/generated").$Enums.DeliveryExceptionReason;
            reportedBy: string | null;
            tripPlanId: string | null;
            deliveryOrderId: string;
            reportedAt: Date;
            resolved: boolean;
            resolvedAt: Date | null;
            resolutionNotes: string | null;
        })[];
    }>;
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        exceptions: ({
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            } | null;
            deliveryOrder: {
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
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: import("prisma/generated").$Enums.DeliveryPriority;
                updatedAt: Date;
                code: string;
                customerId: string;
                status: import("prisma/generated").$Enums.DeliveryOrderStatus;
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            reason: import("prisma/generated").$Enums.DeliveryExceptionReason;
            reportedBy: string | null;
            tripPlanId: string | null;
            deliveryOrderId: string;
            reportedAt: Date;
            resolved: boolean;
            resolvedAt: Date | null;
            resolutionNotes: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        exception: {
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            } | null;
            deliveryOrder: {
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
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: import("prisma/generated").$Enums.DeliveryPriority;
                updatedAt: Date;
                code: string;
                customerId: string;
                status: import("prisma/generated").$Enums.DeliveryOrderStatus;
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
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            reason: import("prisma/generated").$Enums.DeliveryExceptionReason;
            reportedBy: string | null;
            tripPlanId: string | null;
            deliveryOrderId: string;
            reportedAt: Date;
            resolved: boolean;
            resolvedAt: Date | null;
            resolutionNotes: string | null;
        };
    }>;
    createRTO(req: FastifyRequest & {
        user: AuthUser;
    }, doId: string, body: {
        notes?: string;
    }): Promise<{
        success: boolean;
    }>;
}
