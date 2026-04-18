import { GrnItemDto } from './grn-item.dto';
export declare class UpdateGrnDto {
    receiptDate?: string;
    warehouseId?: string;
    supplierId?: string;
    purchaseOrderId?: string;
    purchaseInvoiceId?: string;
    notes?: string;
    items?: GrnItemDto[];
}
