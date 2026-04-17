export declare class CreateNcrDto {
    code: string;
    sourceType: string;
    itemId?: string;
    qty: number;
    ncrType: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    qcId?: string;
    assignedToId?: string;
    evidenceUrl?: string;
}
