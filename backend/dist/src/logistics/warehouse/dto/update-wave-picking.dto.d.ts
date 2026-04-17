import type { WavePickingStatus } from '../../../../prisma/generated/client';
export declare class UpdateWavePickingDto {
    assignedTo?: string;
    status?: WavePickingStatus;
    notes?: string;
}
