"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActivityOverdue = exports.isTicketOverdue = exports.computeTicketSlaDueAt = exports.ticketSlaDaysByPriority = void 0;
exports.ticketSlaDaysByPriority = {
    LOW: 7,
    MEDIUM: 3,
    HIGH: 1,
    URGENT: 0,
};
const computeTicketSlaDueAt = (createdAt, priority) => {
    const days = exports.ticketSlaDaysByPriority[priority] ?? 3;
    const dueAt = new Date(createdAt.getTime());
    dueAt.setDate(dueAt.getDate() + days);
    return dueAt;
};
exports.computeTicketSlaDueAt = computeTicketSlaDueAt;
const isTicketOverdue = (input) => {
    if (input.status === 'RESOLVED' || input.status === 'CLOSED')
        return false;
    return input.now.getTime() > input.slaDueAt.getTime();
};
exports.isTicketOverdue = isTicketOverdue;
const isActivityOverdue = (input) => {
    if (input.status !== 'OPEN')
        return false;
    if (!input.dueAt)
        return false;
    return input.now.getTime() > input.dueAt.getTime();
};
exports.isActivityOverdue = isActivityOverdue;
//# sourceMappingURL=crm-sla.js.map