export declare class PutawayItemDto {
    grnItemId?: string;
    itemId?: string;
    description: string;
    qty: number;
    fromBinLocationId?: string;
    toBinLocationId?: string;
    batchCode?: string;
    serialNo?: string;
}
export declare class CreatePutawayDto {
    putawayDate: string;
    warehouseId: string;
    grnId?: string;
    notes?: string;
    items: PutawayItemDto[];
}
export declare class UpdatePutawayDto {
    putawayDate?: string;
    warehouseId?: string;
    notes?: string;
    items?: PutawayItemDto[];
}
