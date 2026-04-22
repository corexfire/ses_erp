import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';
export declare class SalesInvoicesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private toNumber;
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        invoices: ({
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
            orderId: string | null;
            invoiceDate: Date;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        invoice: {
            totals: {
                subTotal: string;
                taxTotal: string;
                grandTotal: string;
            };
            taxBreakdown: {
                baseAmount: string;
                taxAmount: string;
                taxCodeId: string | null;
                code: string;
                rate: string;
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
            } | null;
            items: ({
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
                } | null;
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                discount: import("@prisma/client-runtime-utils").Decimal | null;
                taxCodeId: string | null;
                itemId: string | null;
                invoiceId: string;
            })[];
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSalesInvoiceDto): Promise<{
        invoice: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateSalesInvoiceDto): Promise<{
        invoice: {
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
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        invoice: {
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
        };
        journal: {
            subTotal: number;
            totalTax: number;
            grandTotal: number;
            lines: {
                description: string;
                baseAmount: number;
                taxAmount: number;
                taxCodeId: string | null;
            }[];
        };
    }>;
    listBillableDos(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        deliveryOrders: ({
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
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                deliveryOrderId: string;
                orderedQty: import("@prisma/client-runtime-utils").Decimal;
                pickedQty: import("@prisma/client-runtime-utils").Decimal;
                packedQty: import("@prisma/client-runtime-utils").Decimal;
                shippedQty: import("@prisma/client-runtime-utils").Decimal;
                deliveredQty: import("@prisma/client-runtime-utils").Decimal;
                batchNo: string | null;
                serialNo: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: import("prisma/generated").$Enums.DeliveryPriority;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.DeliveryOrderStatus;
            customerId: string;
            shipmentId: string | null;
            salesOrderId: string | null;
            warehouseId: string;
            tripPlanId: string | null;
            plannedShipDate: Date | null;
            actualShipDate: Date | null;
            deliveryAddress1: string | null;
            deliveryAddress2: string | null;
            deliveryCity: string | null;
            deliveryProvince: string | null;
            deliveryPostalCode: string | null;
            deliveryNotes: string | null;
            actualDeliveredAt: Date | null;
            podToken: string | null;
            podTokenExpiry: Date | null;
        })[];
    }>;
}
