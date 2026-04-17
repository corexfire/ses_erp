export declare class CreateProductionIssueItemDto {
    itemId: string;
    qty: number;
    uomCode?: string;
}
export declare class CreateProductionIssueDto {
    code: string;
    workOrderId: string;
    issueDate: string;
    notes?: string;
    items: CreateProductionIssueItemDto[];
}
export declare class CreateProductionReceiptDto {
    code: string;
    workOrderId: string;
    receiptDate: string;
    qtyProduced: number;
    uomCode?: string;
    notes?: string;
}
