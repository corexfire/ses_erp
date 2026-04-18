import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreatePackingListDto {
    deliveryOrderId?: string;
    warehouseId: string;
    notes?: string;
    totalWeight?: number;
    totalVolume?: number;
    packageCount?: number;
    shippingMark?: string;
    sealNumber?: string;
    carrierId?: string;
}
export declare class PackingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, search?: string, status?: string): Promise<{
        data: ({
            carrier: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
            } | null;
            deliveryOrder: ({
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
                priority: import("prisma/generated").$Enums.DeliveryPriority;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.DeliveryOrderStatus;
                customerId: string;
                warehouseId: string;
                salesOrderId: string | null;
                shipmentId: string | null;
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
            }) | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            notes: string | null;
            carrierId: string | null;
            warehouseId: string;
            packingDate: Date;
            deliveryOrderId: string | null;
            shippingMark: string | null;
            packedBy: string | null;
            totalWeight: import("@prisma/client-runtime-utils").Decimal | null;
            totalVolume: import("@prisma/client-runtime-utils").Decimal | null;
            packageCount: number | null;
            sealNumber: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        carrier: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        } | null;
        deliveryOrder: ({
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
            items: ({
                item: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
                    code: string;
                    itemGroupId: string | null;
                    baseUomCode: string | null;
                    trackingType: import("prisma/generated").$Enums.ItemTrackingType;
                    valuationMethod: import("prisma/generated").$Enums.ValuationMethod;
                    reorderPoint: import("@prisma/client-runtime-utils").Decimal | null;
                    reorderQty: import("@prisma/client-runtime-utils").Decimal | null;
                    isPurchaseItem: boolean;
                    isSalesItem: boolean;
                    purchaseTaxCodeId: string | null;
                    salesTaxCodeId: string | null;
                    brand: string | null;
                    isSparePart: boolean;
                    manufacturer: string | null;
                    oemPartNumber: string | null;
                } | null;
            } & {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                itemId: string | null;
                serialNo: string | null;
                pickedQty: import("@prisma/client-runtime-utils").Decimal;
                batchNo: string | null;
                deliveryOrderId: string;
                orderedQty: import("@prisma/client-runtime-utils").Decimal;
                packedQty: import("@prisma/client-runtime-utils").Decimal;
                shippedQty: import("@prisma/client-runtime-utils").Decimal;
                deliveredQty: import("@prisma/client-runtime-utils").Decimal;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: import("prisma/generated").$Enums.DeliveryPriority;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.DeliveryOrderStatus;
            customerId: string;
            warehouseId: string;
            salesOrderId: string | null;
            shipmentId: string | null;
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
        }) | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: string;
        notes: string | null;
        carrierId: string | null;
        warehouseId: string;
        packingDate: Date;
        deliveryOrderId: string | null;
        shippingMark: string | null;
        packedBy: string | null;
        totalWeight: import("@prisma/client-runtime-utils").Decimal | null;
        totalVolume: import("@prisma/client-runtime-utils").Decimal | null;
        packageCount: number | null;
        sealNumber: string | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePackingListDto): Promise<{
        packing: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            notes: string | null;
            carrierId: string | null;
            warehouseId: string;
            packingDate: Date;
            deliveryOrderId: string | null;
            shippingMark: string | null;
            packedBy: string | null;
            totalWeight: import("@prisma/client-runtime-utils").Decimal | null;
            totalVolume: import("@prisma/client-runtime-utils").Decimal | null;
            packageCount: number | null;
            sealNumber: string | null;
        };
    }>;
    confirm(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        packing: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: string;
            notes: string | null;
            carrierId: string | null;
            warehouseId: string;
            packingDate: Date;
            deliveryOrderId: string | null;
            shippingMark: string | null;
            packedBy: string | null;
            totalWeight: import("@prisma/client-runtime-utils").Decimal | null;
            totalVolume: import("@prisma/client-runtime-utils").Decimal | null;
            packageCount: number | null;
            sealNumber: string | null;
        };
    }>;
}
