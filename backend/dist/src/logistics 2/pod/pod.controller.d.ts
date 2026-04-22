import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class SubmitPodDto {
    receivedBy: string;
    receivedAt: string;
    notes?: string;
    signatureFileId?: string;
    photoFileIds?: string[];
    geoLat?: number;
    geoLng?: number;
}
export declare class MobileSubmitPodDto {
    receivedBy: string;
    receivedAt: string;
    notes?: string;
    signatureFileId?: string;
    photoFileIds?: string[];
    geoLat?: number;
    geoLng?: number;
}
export declare class MarkFailedDto {
    reason: string;
    description?: string;
}
export declare class PodController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    submitPod(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: SubmitPodDto): Promise<{
        pod: {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: import("prisma/generated").$Enums.ProofOfDeliveryStatus;
            notes: string | null;
            deliveryOrderId: string;
            receivedBy: string;
            receivedAt: Date;
            signatureFileId: string | null;
            photoFileIds: string[];
            geoLat: import("@prisma/client-runtime-utils").Decimal | null;
            geoLng: import("@prisma/client-runtime-utils").Decimal | null;
            verifiedBy: string | null;
            verifiedAt: Date | null;
        };
    }>;
    mobileSubmitPod(token: string, body: MobileSubmitPodDto): Promise<{
        success: boolean;
        podId: string;
    }>;
    markFailed(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: MarkFailedDto): Promise<{
        success: boolean;
    }>;
    createRedelivery(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        deliveryOrder: {
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
        };
    }>;
}
