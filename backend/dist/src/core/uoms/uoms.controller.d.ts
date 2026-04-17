import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUomDto } from './dto/create-uom.dto';
import { CreateUomConversionDto } from './dto/create-uom-conversion.dto';
export declare class UomsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        uoms: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        }[];
    }>;
    listConversions(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        conversions: ({
            fromUom: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
            toUom: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            fromUomId: string;
            toUomId: string;
            factor: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    createConversion(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateUomConversionDto): Promise<{
        conversion: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            fromUomId: string;
            toUomId: string;
            factor: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    deleteConversion(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        ok: boolean;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateUomDto): Promise<{
        uom: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        uom: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
}
