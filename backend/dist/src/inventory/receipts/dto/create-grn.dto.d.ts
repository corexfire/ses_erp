import { GrnItemDto } from './grn-item.dto';
export declare class CreateGrnDto {
    code: string;
    receiptDate: string;
    warehouseId: string;
    supplierId?: string;
    purchaseOrderId?: string;
    purchaseInvoiceId?: string;
    notes?: string;
    items: GrnItemDto[];
}
