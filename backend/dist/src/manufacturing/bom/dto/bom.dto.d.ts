export declare class CreateBomItemDto {
    componentItemId: string;
    qty: number;
    uomCode?: string;
    issueMethod?: string;
    operationNo?: number;
    scrapPercent?: number;
    notes?: string;
}
export declare class CreateBomOperationDto {
    operationNo: number;
    description: string;
    workstation?: string;
    setupTime?: number;
    cycleTime?: number;
    laborScrap?: number;
    notes?: string;
}
export declare class CreateBomDto {
    code: string;
    name: string;
    itemId: string;
    bomType?: string;
    baseQty?: number;
    costingMethod?: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string;
    items: CreateBomItemDto[];
    operations?: CreateBomOperationDto[];
}
export declare class UpdateBomDto {
    name?: string;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string;
}
export declare class UpdateBomItemDto {
    qty?: number;
    uomCode?: string;
    scrapPercent?: number;
    notes?: string;
}
