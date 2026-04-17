export declare class PackingItemDto {
    itemId?: string;
    description: string;
    qty: number;
    uomCode?: string;
}
export declare class CreatePackingDto {
    packingDate: string;
    warehouseId: string;
    salesOrderId?: string;
    notes?: string;
    items: PackingItemDto[];
}
export declare class UpdatePackingDto {
    packingDate?: string;
    warehouseId?: string;
    notes?: string;
    items?: PackingItemDto[];
}
