import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaxCodeDto } from './dto/create-tax-code.dto';
export declare class TaxController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        taxCodes: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTaxCodeDto): Promise<{
        taxCode: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        };
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        taxCode: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            effectiveDate: Date;
        };
    }>;
}
