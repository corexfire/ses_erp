import { FsmServiceType, TicketPriority, FsmServiceOrderStatus } from '../../../prisma/generated/client';
export declare class UpdateFsmServiceOrderDto {
    customerId?: string;
    contactName?: string;
    contactPhone?: string;
    serviceType?: FsmServiceType;
    priority?: TicketPriority;
    status?: FsmServiceOrderStatus;
    subject?: string;
    description?: string;
    locationAddress?: string;
    coordinateLat?: number;
    coordinateLng?: number;
    slaDate?: string;
    preferredDate?: string;
    totalEstimatedDuration?: number;
    notes?: string;
}
