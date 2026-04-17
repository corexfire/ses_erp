import { SalesReturnItemDto } from './sales-return-item.dto';
export declare class CreateSalesReturnDto {
    code: string;
    customerId: string;
    orderId?: string;
    returnDate: string;
    notes?: string;
    items: SalesReturnItemDto[];
}
