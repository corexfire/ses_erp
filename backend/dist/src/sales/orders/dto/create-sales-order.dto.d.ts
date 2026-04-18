import { SalesOrderItemDto } from './sales-order-item.dto';
export declare class CreateSalesOrderDto {
    code: string;
    customerId: string;
    quotationId?: string;
    orderDate: string;
    notes?: string;
    items: SalesOrderItemDto[];
}
