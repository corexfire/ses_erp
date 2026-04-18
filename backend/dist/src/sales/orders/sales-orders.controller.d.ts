import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';
export declare class SalesOrdersController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        orders: ({
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
            } | null;
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        order: {
            returns: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                customerId: string;
                notes: string | null;
                orderId: string | null;
                returnDate: Date;
            }[];
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
            shipments: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ShipmentStatus;
                orderId: string | null;
                carrierId: string | null;
                trackingNo: string | null;
                shipDate: Date | null;
                deliveryDate: Date | null;
            }[];
            invoices: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                customerId: string;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
            }[];
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
            } | null;
            workflowDef: ({
                steps: {
                    id: string;
                    tenantId: string;
                    name: string | null;
                    createdAt: Date;
                    roleId: string;
                    updatedAt: Date;
                    stepNo: number;
                    conditionType: string | null;
                    conditionValue: import("@prisma/client-runtime-utils").Decimal | null;
                    slaHours: number;
                    definitionId: string;
                }[];
            } & {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                moduleKey: string;
                docType: string;
            }) | null;
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                orderId: string;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                discount: import("@prisma/client-runtime-utils").Decimal | null;
                taxCodeId: string | null;
                itemId: string | null;
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
            quotationId: string | null;
            orderDate: Date;
            workflowDefinitionId: string | null;
            currentStepNo: number | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSalesOrderDto): Promise<{
        order: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateSalesOrderDto): Promise<{
        order: {
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
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        order: {
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
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        order: {
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
        };
    }>;
    reject(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        order: {
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
        };
    }>;
}
