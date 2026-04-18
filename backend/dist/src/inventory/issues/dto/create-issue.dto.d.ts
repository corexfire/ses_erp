export declare class IssueItemDto {
    itemId?: string;
    description: string;
    qty: number;
    uomCode?: string;
    warehouseId: string;
    binLocationId?: string;
    batchCode?: string;
    serialNo?: string;
}
export declare class CreateGoodsIssueDto {
    issueDate: string;
    warehouseId: string;
    referenceType?: string;
    referenceId?: string;
    notes?: string;
    items: IssueItemDto[];
}
export declare class UpdateGoodsIssueDto {
    issueDate?: string;
    warehouseId?: string;
    referenceType?: string;
    referenceId?: string;
    notes?: string;
    items?: IssueItemDto[];
}
