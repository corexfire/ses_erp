import { FsmServiceType, TicketPriority } from '../../../prisma/generated/client';
export declare class CreateFsmServiceOrderDto {
    code: string;
    customerId: string;
    contactName?: string;
    contactPhone?: string;
    serviceType?: FsmServiceType;
    priority?: TicketPriority;
    subject: string;
    description?: string;
    locationAddress?: string;
    coordinateLat?: number;
    coordinateLng?: number;
    slaDate?: string;
    preferredDate?: string;
    totalEstimatedDuration?: number;
    notes?: string;
}
