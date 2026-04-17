import { PurchaseReturnItemDto } from './purchase-return-item.dto';
export declare class CreatePurchaseReturnDto {
    code: string;
    supplierId: string;
    orderId?: string;
    invoiceId?: string;
    returnDate: string;
    notes?: string;
    items: PurchaseReturnItemDto[];
}
