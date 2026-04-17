export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type ActivityStatus = 'OPEN' | 'DONE' | 'CANCELED';

export const ticketSlaDaysByPriority: Record<TicketPriority, number> = {
  LOW: 7,
  MEDIUM: 3,
  HIGH: 1,
  URGENT: 0,
};

export const computeTicketSlaDueAt = (
  createdAt: Date,
  priority: TicketPriority,
) => {
  const days = ticketSlaDaysByPriority[priority] ?? 3;
  const dueAt = new Date(createdAt.getTime());
  dueAt.setDate(dueAt.getDate() + days);
  return dueAt;
};

export const isTicketOverdue = (input: {
  now: Date;
  status: TicketStatus;
  slaDueAt: Date;
}) => {
  if (input.status === 'RESOLVED' || input.status === 'CLOSED') return false;
  return input.now.getTime() > input.slaDueAt.getTime();
};

export const isActivityOverdue = (input: {
  now: Date;
  status: ActivityStatus;
  dueAt: Date | null;
}) => {
  if (input.status !== 'OPEN') return false;
  if (!input.dueAt) return false;
  return input.now.getTime() > input.dueAt.getTime();
};
