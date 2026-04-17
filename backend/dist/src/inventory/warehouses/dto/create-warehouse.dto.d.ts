import { WarehouseType } from '../../../../prisma/generated/client';
export declare class CreateWarehouseDto {
    code: string;
    name: string;
    type?: WarehouseType;
    address1?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    managerId?: string;
    capacityWeight?: number;
    capacityVolume?: number;
}
