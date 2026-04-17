import { RfqItemDto } from './rfq-item.dto';
export declare class CreateRfqDto {
    code: string;
    issueDate: string;
    notes?: string;
    supplierIds?: string[];
    items: RfqItemDto[];
}
