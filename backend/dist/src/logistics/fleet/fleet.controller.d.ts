import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFleetVehicleDto } from './dto/create-fleet-vehicle.dto';
import { UpdateFleetVehicleDto } from './dto/update-fleet-vehicle.dto';
export declare class FleetController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        vehicles: ({
            transporter: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                code: string;
                notes: string | null;
                supplierId: string | null;
                contactName: string | null;
                address: string | null;
            } | null;
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        vehicle: {
            transporter: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                code: string;
                notes: string | null;
                supplierId: string | null;
                contactName: string | null;
                address: string | null;
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateFleetVehicleDto): Promise<{
        vehicle: {
            transporter: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                code: string;
                notes: string | null;
                supplierId: string | null;
                contactName: string | null;
                address: string | null;
            } | null;
        } & {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateFleetVehicleDto): Promise<{
        vehicle: {
            transporter: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                code: string;
                notes: string | null;
                supplierId: string | null;
                contactName: string | null;
                address: string | null;
            } | null;
        } & {
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
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
        };
    }>;
}
