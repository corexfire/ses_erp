export declare class CreateWorkOrderComponentDto {
    itemId: string;
    qtyRequired: number;
    uomCode?: string;
}
export declare class CreateWorkOrderOperationDto {
    lineNo: number;
    operationNo: number;
    description?: string;
    workstation?: string;
    laborHours?: number;
}
export declare class CreateWorkOrderDto {
    code: string;
    bomId?: string;
    finishedGoodItemId: string;
    warehouseId?: string;
    qtyPlanned: number;
    uomCode?: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
    notes?: string;
    components?: CreateWorkOrderComponentDto[];
    operations?: CreateWorkOrderOperationDto[];
}
export declare class UpdateWorkOrderDto {
    qtyPlanned?: number;
    plannedStartDate?: string;
    plannedEndDate?: string;
    notes?: string;
}
