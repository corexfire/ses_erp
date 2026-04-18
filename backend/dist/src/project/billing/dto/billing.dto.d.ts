export declare class CreateProgressClaimDto {
    projectId: string;
    claimNo: string;
    progressPercent: number;
    description?: string;
}
export declare class CreateProgressInvoiceDto {
    progressClaimId: string;
    retentionPercent?: number;
    dpDeductionAmount?: number;
}
