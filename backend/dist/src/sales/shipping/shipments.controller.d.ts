import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
export declare class ShipmentsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        shipments: ({
            carrier: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
            order: ({
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
                customerId: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                notes: string | null;
                quotationId: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
            }) | null;
        } & {
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        shipment: {
            carrier: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
            order: ({
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
                    orderId: string;
                    lineNo: number;
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
                customerId: string;
                status: import("prisma/generated").$Enums.SalesDocStatus;
                notes: string | null;
                quotationId: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
            }) | null;
        } & {
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateShipmentDto): Promise<{
        shipment: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateShipmentDto): Promise<{
        shipment: {
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
        };
    }>;
}
