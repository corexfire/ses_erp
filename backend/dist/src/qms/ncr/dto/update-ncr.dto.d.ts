export declare class UpdateNcrDto {
    description?: string;
    rootCause?: string;
    disposition?: 'PENDING' | 'USE_AS_IS' | 'REWORK' | 'REPAIR' | 'SCRAP' | 'RETURN_TO_VENDOR';
    severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    status?: 'DRAFT' | 'OPEN' | 'UNDER_INVESTIGATION' | 'PENDING_APPROVAL' | 'DISPOSITIONED' | 'VERIFIED' | 'CLOSED' | 'VOID' | 'REJECTED';
    assignedToId?: string;
    evidenceUrl?: string;
    qty?: number;
}
