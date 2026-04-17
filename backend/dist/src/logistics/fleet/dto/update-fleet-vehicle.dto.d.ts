import { VehicleOwnershipType, VehicleStatus } from '../../../../prisma/generated/client';
export declare class UpdateFleetVehicleDto {
    code?: string;
    plateNo?: string;
    vehicleType?: string;
    brand?: string;
    model?: string;
    year?: number;
    ownershipType?: VehicleOwnershipType;
    capacityWeight?: number;
    capacityVolume?: number;
    status?: VehicleStatus;
    transporterId?: string;
    stnkNo?: string;
    stnkExpiry?: string;
    kirNo?: string;
    kirExpiry?: string;
    notes?: string;
}
