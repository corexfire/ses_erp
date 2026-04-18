import { FsmAppointmentStatus } from '../../../prisma/generated/client';
export declare class UpdateFsmAppointmentDto {
    status?: FsmAppointmentStatus;
    technicianId?: string;
    scheduledStart?: string;
    scheduledEnd?: string;
    actualStart?: string;
    actualEnd?: string;
    travelTimeMin?: number;
    workingTimeMin?: number;
    notes?: string;
}
