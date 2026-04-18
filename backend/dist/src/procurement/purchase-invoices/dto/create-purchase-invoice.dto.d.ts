import { PurchaseInvoiceItemDto } from './purchase-invoice-item.dto';
export declare class CreatePurchaseInvoiceDto {
    code: string;
    supplierId: string;
    orderId?: string;
    invoiceDate: string;
    notes?: string;
    items: PurchaseInvoiceItemDto[];
}
