import { PurchaseRequisitionItemDto } from './purchase-requisition-item.dto';
export declare class CreatePurchaseRequisitionDto {
    code: string;
    requestDate: string;
    notes?: string;
    items: PurchaseRequisitionItemDto[];
}
