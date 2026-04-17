declare const leadStatuses: readonly ["NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"];
export declare class UpdateLeadDto {
    name?: string;
    email?: string;
    phone?: string;
    source?: string;
    notes?: string;
    status?: (typeof leadStatuses)[number];
}
export {};
