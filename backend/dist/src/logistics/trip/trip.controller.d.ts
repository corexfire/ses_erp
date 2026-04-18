import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreateRouteTemplateDto {
    code?: string;
    name: string;
    warehouseId?: string;
    description?: string;
}
export declare class CreateTripDto {
    routeDate: string;
    vehicleId?: string;
    driverId?: string;
    routeTemplateId?: string;
    notes?: string;
}
export declare class AssignDeliveriesDto {
    deliveryOrderIds: string[];
}
export declare class DispatchTripDto {
    vehicleId: string;
    driverId: string;
    loaderUserIds?: string[];
    departureAt: string;
}
export declare class AddCheckpointDto {
    checkpointType: 'LOADED' | 'DEPARTED' | 'ARRIVED' | 'DELIVERED' | 'RETURNED' | 'FAILED';
    locationName?: string;
    latitude?: number;
    longitude?: number;
    deliveryOrderId?: string;
    notes?: string;
}
export declare class RouteController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listRoutes(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        routes: ({
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            warehouseId: string | null;
            standardCost: import("@prisma/client-runtime-utils").Decimal | null;
            destination: string | null;
            origin: string | null;
            distanceKm: import("@prisma/client-runtime-utils").Decimal | null;
            estDurationHours: import("@prisma/client-runtime-utils").Decimal | null;
        })[];
    }>;
    getRoute(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        route: {
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
            } | null;
            tripPlans: {
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
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            warehouseId: string | null;
            standardCost: import("@prisma/client-runtime-utils").Decimal | null;
            destination: string | null;
            origin: string | null;
            distanceKm: import("@prisma/client-runtime-utils").Decimal | null;
            estDurationHours: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
    createRoute(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateRouteTemplateDto): Promise<{
        route: {
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
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            warehouseId: string | null;
            standardCost: import("@prisma/client-runtime-utils").Decimal | null;
            destination: string | null;
            origin: string | null;
            distanceKm: import("@prisma/client-runtime-utils").Decimal | null;
            estDurationHours: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
}
export declare class TripController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string, routeDate?: string, vehicleId?: string, driverId?: string): Promise<{
        trips: ({
            routeTemplate: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                warehouseId: string | null;
                standardCost: import("@prisma/client-runtime-utils").Decimal | null;
                destination: string | null;
                origin: string | null;
                distanceKm: import("@prisma/client-runtime-utils").Decimal | null;
                estDurationHours: import("@prisma/client-runtime-utils").Decimal | null;
            } | null;
            _count: {
                deliveryOrders: number;
            };
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
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        trip: {
            routeTemplate: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                warehouseId: string | null;
                standardCost: import("@prisma/client-runtime-utils").Decimal | null;
                destination: string | null;
                origin: string | null;
                distanceKm: import("@prisma/client-runtime-utils").Decimal | null;
                estDurationHours: import("@prisma/client-runtime-utils").Decimal | null;
            } | null;
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
                proofOfDelivery: {
                    id: string;
                    tenantId: string;
                    createdAt: Date;
                    status: import("prisma/generated").$Enums.ProofOfDeliveryStatus;
                    notes: string | null;
                    receivedBy: string;
                    deliveryOrderId: string;
                    receivedAt: Date;
                    signatureFileId: string | null;
                    photoFileIds: string[];
                    geoLat: import("@prisma/client-runtime-utils").Decimal | null;
                    geoLng: import("@prisma/client-runtime-utils").Decimal | null;
                    verifiedBy: string | null;
                    verifiedAt: Date | null;
                } | null;
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
            checkpoints: {
                id: string;
                tenantId: string;
                createdAt: Date;
                latitude: import("@prisma/client-runtime-utils").Decimal | null;
                longitude: import("@prisma/client-runtime-utils").Decimal | null;
                notes: string | null;
                timestamp: Date;
                tripPlanId: string;
                checkpointType: import("prisma/generated").$Enums.TripCheckpointType;
                locationName: string | null;
                deliveryOrderId: string | null;
            }[];
            costs: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                journalEntryId: string | null;
                status: import("prisma/generated").$Enums.TripCostStatus;
                notes: string | null;
                amount: import("@prisma/client-runtime-utils").Decimal;
                supplierId: string | null;
                approvedBy: string | null;
                approvedAt: Date | null;
                tripPlanId: string;
                costType: import("prisma/generated").$Enums.TripCostType;
                currencyCode: string;
                paymentRequestId: string | null;
                submittedBy: string | null;
                submittedAt: Date | null;
                postedToFinance: boolean;
            }[];
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTripDto): Promise<{
        trip: {
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
        };
    }>;
    assignDeliveries(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AssignDeliveriesDto): Promise<{
        success: boolean;
        assignedCount: number;
    }>;
    dispatch(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: DispatchTripDto): Promise<{
        trip: {
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
        };
    }>;
    addCheckpoint(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AddCheckpointDto): Promise<{
        checkpoint: {
            id: string;
            tenantId: string;
            createdAt: Date;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            notes: string | null;
            timestamp: Date;
            tripPlanId: string;
            checkpointType: import("prisma/generated").$Enums.TripCheckpointType;
            locationName: string | null;
            deliveryOrderId: string | null;
        };
    }>;
    complete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        trip: {
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
        };
    }>;
}
