import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommissionEntryDto } from './dto/create-commission-entry.dto';
import { CreateCommissionSchemeDto } from './dto/create-commission-scheme.dto';
export declare class CommissionsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listSchemes(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        schemes: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    createScheme(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCommissionSchemeDto): Promise<{
        scheme: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    listEntries(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        entries: ({
            invoice: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                customerId: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
            } | null;
            salesUser: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
            } | null;
            scheme: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                rate: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            schemeId: string;
            invoiceId: string | null;
            salesUserId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            amount: import("@prisma/client-runtime-utils").Decimal;
        })[];
    }>;
    createEntry(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCommissionEntryDto): Promise<{
        entry: {
            invoice: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                customerId: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
            } | null;
            salesUser: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
            } | null;
            scheme: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                rate: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            schemeId: string;
            invoiceId: string | null;
            salesUserId: string | null;
            baseAmount: import("@prisma/client-runtime-utils").Decimal;
            amount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
