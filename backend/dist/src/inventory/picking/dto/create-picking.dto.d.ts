export declare class PickingItemDto {
    itemId?: string;
    description: string;
    qty: number;
    fromBinLocationId?: string;
    batchCode?: string;
    serialNo?: string;
}
export declare class CreatePickingDto {
    pickingDate: string;
    warehouseId: string;
    salesOrderId?: string;
    notes?: string;
    items: PickingItemDto[];
}
export declare class UpdatePickingDto {
    pickingDate?: string;
    warehouseId?: string;
    notes?: string;
    items?: PickingItemDto[];
}
