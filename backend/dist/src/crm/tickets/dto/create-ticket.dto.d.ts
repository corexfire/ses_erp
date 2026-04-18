declare const priorities: readonly ["LOW", "MEDIUM", "HIGH", "URGENT"];
declare const statuses: readonly ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
export declare class CreateTicketDto {
    code: string;
    customerId: string;
    subject: string;
    priority?: (typeof priorities)[number];
    status?: (typeof statuses)[number];
    notes?: string;
}
export {};
