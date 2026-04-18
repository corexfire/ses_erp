import { StockCountItemDto } from './stock-count-item.dto';
export declare class CreateStockCountDto {
    code: string;
    countDate: string;
    warehouseId: string;
    notes?: string;
    items: StockCountItemDto[];
}
