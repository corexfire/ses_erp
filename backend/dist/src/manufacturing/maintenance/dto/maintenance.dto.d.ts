export declare class CreateEquipmentDto {
    code: string;
    name: string;
    type?: string;
    location?: string;
    serialNumber?: string;
    manufacturer?: string;
    model?: string;
    criticality?: string;
    purchaseDate?: string;
    warrantyExpiryDate?: string;
    workCenterId?: string;
    installedDate?: string;
    notes?: string;
}
export declare class CreateMaintenanceScheduleDto {
    equipmentId: string;
    name: string;
    frequency: string;
    intervalDays: number;
    nextDate: string;
    tasks?: string[];
}
export declare class CreateMaintenanceRequestDto {
    code: string;
    equipmentId: string;
    requestDate: string;
    problem: string;
    priority?: string;
    assignedTo?: string;
    notes?: string;
}
export declare class UpdateMaintenanceRequestDto {
    status?: string;
    priority?: string;
    assignedTo?: string;
    notes?: string;
}
export declare class CreateLogPartDto {
    itemId: string;
    warehouseId: string;
    qtyUsed: number;
    unitCost: number;
}
export declare class CreateMaintenanceLogDto {
    equipmentId: string;
    requestId?: string;
    scheduleId?: string;
    technicianName: string;
    workType: string;
    durationMin: number;
    description: string;
    laborCost?: number;
    parts?: CreateLogPartDto[];
}
