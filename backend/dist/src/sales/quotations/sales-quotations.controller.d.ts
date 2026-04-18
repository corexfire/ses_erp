import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSalesQuotationDto } from './dto/create-sales-quotation.dto';
import { UpdateSalesQuotationDto } from './dto/update-sales-quotation.dto';
export declare class SalesQuotationsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        quotations: ({
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
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.SalesDocStatus;
            customerId: string;
            notes: string | null;
            issueDate: Date;
            expiryDate: Date | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        quotation: {
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
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                quotationId: string;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                discount: import("@prisma/client-runtime-utils").Decimal | null;
                taxCodeId: string | null;
            }[];
            orders: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                customerId: string;
                notes: string | null;
                quotationId: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.SalesDocStatus;
            customerId: string;
            notes: string | null;
            issueDate: Date;
            expiryDate: Date | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSalesQuotationDto): Promise<{
        quotation: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.SalesDocStatus;
            customerId: string;
            notes: string | null;
            issueDate: Date;
            expiryDate: Date | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateSalesQuotationDto): Promise<{
        quotation: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.SalesDocStatus;
            customerId: string;
            notes: string | null;
            issueDate: Date;
            expiryDate: Date | null;
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        quotation: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.SalesDocStatus;
            customerId: string;
            notes: string | null;
            issueDate: Date;
            expiryDate: Date | null;
        };
    }>;
}
