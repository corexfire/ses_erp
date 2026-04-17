import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreateTransporterDto {
    code?: string;
    name: string;
    supplierId?: string;
    contactName?: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
}
export declare class UpdateTransporterDto {
    name?: string;
    supplierId?: string;
    contactName?: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive?: boolean;
    notes?: string;
}
export declare class TransporterController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        transporters: ({
            _count: {
                vehicles: number;
                drivers: number;
            };
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        transporter: {
            vehicles: {
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
            }[];
            drivers: {
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
            }[];
        } & {
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTransporterDto): Promise<{
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateTransporterDto): Promise<{
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
        };
    }>;
}
