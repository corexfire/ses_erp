import { LandedCostAllocationDto } from './landed-cost-allocation.dto';
export declare class UpdateLandedCostDto {
    supplierId?: string;
    orderId?: string;
    invoiceId?: string;
    costDate?: string;
    totalAmount?: string;
    notes?: string;
    allocations?: LandedCostAllocationDto[];
}
