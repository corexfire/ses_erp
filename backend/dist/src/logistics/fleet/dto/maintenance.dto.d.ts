export declare class CreateVehicleMaintenanceDto {
    maintenanceType: string;
    description?: string;
    kmInterval?: number;
    dateInterval?: number;
    lastServiceAt?: string;
    nextServiceAt?: string;
    cost?: number;
    status?: string;
    vendorId?: string;
}
declare const UpdateVehicleMaintenanceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleMaintenanceDto>>;
export declare class UpdateVehicleMaintenanceDto extends UpdateVehicleMaintenanceDto_base {
}
export {};
