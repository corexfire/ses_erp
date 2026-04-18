import { SalesQuotationItemDto } from './sales-quotation-item.dto';
export declare class CreateSalesQuotationDto {
    code: string;
    customerId: string;
    issueDate: string;
    expiryDate?: string;
    notes?: string;
    items: SalesQuotationItemDto[];
}
