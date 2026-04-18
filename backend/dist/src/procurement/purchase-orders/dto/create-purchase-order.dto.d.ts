import { PurchaseOrderItemDto } from './purchase-order-item.dto';
export declare class CreatePurchaseOrderDto {
    code: string;
    supplierId: string;
    rfqId?: string;
    orderDate: string;
    notes?: string;
    items: PurchaseOrderItemDto[];
}
