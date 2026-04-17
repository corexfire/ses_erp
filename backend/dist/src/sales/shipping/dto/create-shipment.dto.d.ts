import type { ShipmentStatus } from '../../../../prisma/generated/client';
export declare class CreateShipmentDto {
    code: string;
    orderId?: string;
    carrierId?: string;
    trackingNo?: string;
    shipDate?: string;
    deliveryDate?: string;
    status?: ShipmentStatus;
}
