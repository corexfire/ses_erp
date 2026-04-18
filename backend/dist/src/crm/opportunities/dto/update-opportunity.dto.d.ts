declare const stages: readonly ["QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"];
export declare class UpdateOpportunityDto {
    name?: string;
    stage?: (typeof stages)[number];
    expectedValue?: string;
    leadId?: string;
    customerId?: string;
    closeDate?: string;
    notes?: string;
}
export {};
