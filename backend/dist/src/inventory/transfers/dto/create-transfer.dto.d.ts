import { TransferItemDto } from './transfer-item.dto';
export declare class CreateTransferDto {
    code: string;
    transferDate: string;
    fromWarehouseId: string;
    toWarehouseId: string;
    notes?: string;
    items: TransferItemDto[];
}
