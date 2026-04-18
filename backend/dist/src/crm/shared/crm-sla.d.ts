export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type ActivityStatus = 'OPEN' | 'DONE' | 'CANCELED';
export declare const ticketSlaDaysByPriority: Record<TicketPriority, number>;
export declare const computeTicketSlaDueAt: (createdAt: Date, priority: TicketPriority) => Date;
export declare const isTicketOverdue: (input: {
    now: Date;
    status: TicketStatus;
    slaDueAt: Date;
}) => boolean;
export declare const isActivityOverdue: (input: {
    now: Date;
    status: ActivityStatus;
    dueAt: Date | null;
}) => boolean;
