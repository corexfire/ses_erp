export declare class CreateItemUomDto {
    itemId: string;
    uomCode: string;
    isBase?: boolean;
    conversionRate?: number;
    price?: number;
}
export declare class UpdateItemUomDto {
    isBase?: boolean;
    conversionRate?: number;
    price?: number;
}
