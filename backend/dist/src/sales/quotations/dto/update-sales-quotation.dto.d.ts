import { SalesQuotationItemDto } from './sales-quotation-item.dto';
export declare class UpdateSalesQuotationDto {
    issueDate?: string;
    expiryDate?: string;
    notes?: string;
    items?: SalesQuotationItemDto[];
}
