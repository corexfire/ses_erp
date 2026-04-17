declare const statuses: readonly ["PLANNED", "ACTIVE", "COMPLETED", "CANCELED"];
export declare class CreateCampaignDto {
    code: string;
    name: string;
    channel?: string;
    status?: (typeof statuses)[number];
    startDate?: string;
    endDate?: string;
    budget?: string;
    notes?: string;
}
export {};
