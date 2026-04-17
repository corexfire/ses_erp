import { SalesInvoiceItemDto } from './sales-invoice-item.dto';
export declare class CreateSalesInvoiceDto {
    code: string;
    customerId: string;
    orderId?: string;
    invoiceDate: string;
    notes?: string;
    items: SalesInvoiceItemDto[];
}
