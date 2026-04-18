declare const types: readonly ["CALL", "EMAIL", "MEETING", "TASK"];
declare const statuses: readonly ["OPEN", "DONE", "CANCELED"];
export declare class UpdateActivityDto {
    type?: (typeof types)[number];
    subject?: string;
    dueAt?: Date;
    status?: (typeof statuses)[number];
    leadId?: string;
    customerId?: string;
    opportunityId?: string;
    notes?: string;
}
export {};
