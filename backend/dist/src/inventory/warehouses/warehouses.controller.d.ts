import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBinLocationDto } from './dto/create-bin-location.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateBinLocationDto } from './dto/update-bin-location.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehousesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        warehouses: ({
            _count: {
                binLocations: number;
                zones: number;
            };
            binLocations: {
                id: string;
                tenantId: string;
                name: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.BinType;
                warehouseId: string;
                zoneId: string | null;
            }[];
            manager: {
                id: string;
                email: string;
                name: string | null;
            } | null;
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        warehouse: {
            binLocations: {
                id: string;
                tenantId: string;
                name: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: import("prisma/generated").$Enums.BinType;
                warehouseId: string;
                zoneId: string | null;
            }[];
            manager: {
                id: string;
                email: string;
                name: string | null;
            } | null;
            zones: ({
                bins: {
                    id: string;
                    tenantId: string;
                    name: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    code: string;
                    type: import("prisma/generated").$Enums.BinType;
                    warehouseId: string;
                    zoneId: string | null;
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
                warehouseId: string;
            })[];
        } & {
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateWarehouseDto): Promise<{
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
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateWarehouseDto): Promise<{
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
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
    }>;
    listZones(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        zones: ({
            _count: {
                bins: number;
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
            warehouseId: string;
        })[];
    }>;
    createZone(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        code: string;
        name: string;
        description?: string;
    }): Promise<{
        zone: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            warehouseId: string;
        };
    }>;
    listBins(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        bins: ({
            zone: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                warehouseId: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.BinType;
            warehouseId: string;
            zoneId: string | null;
        })[];
    }>;
    createBin(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: CreateBinLocationDto): Promise<{
        bin: {
            id: string;
            tenantId: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.BinType;
            warehouseId: string;
            zoneId: string | null;
        };
    }>;
    updateBin(req: FastifyRequest & {
        user: AuthUser;
    }, binId: string, body: UpdateBinLocationDto): Promise<{
        bin: {
            id: string;
            tenantId: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.BinType;
            warehouseId: string;
            zoneId: string | null;
        };
    }>;
    deactivateBin(req: FastifyRequest & {
        user: AuthUser;
    }, binId: string): Promise<{
        bin: {
            id: string;
            tenantId: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: import("prisma/generated").$Enums.BinType;
            warehouseId: string;
            zoneId: string | null;
        };
    }>;
}
