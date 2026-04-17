import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(req: FastifyRequest & {
        user: AuthUser;
    }, date?: string): Promise<{
        deliveryOrderStatusCount: Record<string, number>;
        tripStatusCount: Record<string, number>;
        otifRate: number;
        todayDeliveries: {
            count: number;
            items: ({
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
            })[];
        };
        activeTrips: {
            count: number;
            items: ({
                driver: {
                    id: string;
                    email: string | null;
                    tenantId: string;
                    name: string;
                    createdAt: Date;
                    phone: string | null;
                    updatedAt: Date;
                    code: string;
                    status: import("prisma/generated").$Enums.DriverStatus;
                    notes: string | null;
                    employeeId: string | null;
                    transporterId: string | null;
                    address: string | null;
                    licenseType: import("prisma/generated").$Enums.DriverLicenseType;
                    licenseNo: string | null;
                    licenseExpiry: Date | null;
                } | null;
                vehicle: {
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    year: number | null;
                    updatedAt: Date;
                    code: string;
                    status: import("prisma/generated").$Enums.VehicleStatus;
                    notes: string | null;
                    brand: string | null;
                    capacityWeight: import("@prisma/client-runtime-utils").Decimal;
                    capacityVolume: import("@prisma/client-runtime-utils").Decimal;
                    model: string | null;
                    plateNo: string;
                    vehicleType: string;
                    ownershipType: import("prisma/generated").$Enums.VehicleOwnershipType;
                    transporterId: string | null;
                    stnkNo: string | null;
                    stnkExpiry: Date | null;
                    kirNo: string | null;
                    kirExpiry: Date | null;
                } | null;
            } & {
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
            })[];
        };
        pendingPodCount: number;
        summary: {
            totalDo: number;
            pendingDo: number;
            inTransitDo: number;
            deliveredDo: number;
            failedDo: number;
            totalTrips: number;
            completedTrips: number;
            activeTripsCount: number;
        };
    }>;
}
