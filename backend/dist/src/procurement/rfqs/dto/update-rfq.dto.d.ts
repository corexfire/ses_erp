import { RfqItemDto } from './rfq-item.dto';
export declare class UpdateRfqDto {
    issueDate?: string;
    notes?: string;
    supplierIds?: string[];
    items?: RfqItemDto[];
}
