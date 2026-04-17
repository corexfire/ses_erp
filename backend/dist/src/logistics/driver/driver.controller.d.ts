import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { DriverStatus, DriverLicenseType } from '../../../prisma/generated/client';
export declare class CreateDriverDto {
    code?: string;
    name: string;
    employeeId?: string;
    licenseType: DriverLicenseType;
    licenseNo?: string;
    licenseExpiry?: string;
    phone?: string;
    email?: string;
    address?: string;
    status?: DriverStatus;
    transporterId?: string;
    notes?: string;
}
export declare class UpdateDriverDto {
    name?: string;
    employeeId?: string;
    licenseType?: DriverLicenseType;
    licenseNo?: string;
    licenseExpiry?: string;
    phone?: string;
    email?: string;
    address?: string;
    status?: DriverStatus;
    transporterId?: string;
    notes?: string;
}
export declare class DriverController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        drivers: ({
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        driver: {
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDriverDto): Promise<{
        driver: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateDriverDto): Promise<{
        driver: {
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
        };
    }>;
}
