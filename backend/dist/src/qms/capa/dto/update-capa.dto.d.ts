export declare class UpdateCapaDto {
    description?: string;
    rootCause?: string;
    correctiveAction?: string;
    preventiveAction?: string;
    targetDate?: string;
    status?: 'DRAFT' | 'OPEN' | 'UNDER_REVIEW' | 'IMPLEMENTING' | 'VERIFYING' | 'CLOSED' | 'VOID';
    assignedToId?: string;
    findings?: string;
    evidenceUrl?: string;
}
