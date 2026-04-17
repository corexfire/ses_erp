import { FsmAppointmentStatus } from '../../../prisma/generated/client';
export declare class CreateFsmAppointmentDto {
    serviceOrderId: string;
    technicianId: string;
    status?: FsmAppointmentStatus;
    scheduledStart: string;
    scheduledEnd: string;
    notes?: string;
}
