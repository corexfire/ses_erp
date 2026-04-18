import type { ShipmentStatus } from '../../../../prisma/generated/client';
export declare class UpdateShipmentDto {
    orderId?: string;
    carrierId?: string;
    trackingNo?: string;
    shipDate?: string;
    deliveryDate?: string;
    status?: ShipmentStatus;
}
