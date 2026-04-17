export declare class CreateInProcessQcDto {
    workOrderId: string;
    qtyInspected: number;
    qtyPassed: number;
    qtyFailed: number;
    notes?: string;
}
export declare class UpdateInProcessQcDto {
    status?: string;
    qtyInspected?: number;
    qtyPassed?: number;
    qtyFailed?: number;
    notes?: string;
}
