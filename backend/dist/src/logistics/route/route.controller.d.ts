import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreateRouteTemplateDto {
    code: string;
    name: string;
    warehouseId?: string;
    description?: string;
    origin?: string;
    destination?: string;
    distanceKm?: number;
    estDurationHours?: number;
    standardCost?: number;
    isActive?: boolean;
}
export declare class UpdateRouteTemplateDto {
    name?: string;
    warehouseId?: string;
    description?: string;
    origin?: string;
    destination?: string;
    distanceKm?: number;
    estDurationHours?: number;
    standardCost?: number;
    isActive?: boolean;
}
export declare class RouteController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(query: {
        search?: string;
        isActive?: string;
        page?: string;
        limit?: string;
    }, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        data: ({
            warehouse: {
                name: string;
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
        total: number;
        page: number;
        limit: number;
    }>;
    get(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
        _count: {
            tripPlans: number;
        };
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
    }>;
    create(body: CreateRouteTemplateDto, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
    update(id: string, body: UpdateRouteTemplateDto, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
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
    }>;
}
