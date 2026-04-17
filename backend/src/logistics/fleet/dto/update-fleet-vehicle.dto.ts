import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { VehicleOwnershipType, VehicleStatus } from '../../../../prisma/generated/client';

export class UpdateFleetVehicleDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  plateNo?: string;

  @IsString()
  @IsOptional()
  vehicleType?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsEnum(VehicleOwnershipType)
  @IsOptional()
  ownershipType?: VehicleOwnershipType;

  @IsNumber()
  @IsOptional()
  capacityWeight?: number;

  @IsNumber()
  @IsOptional()
  capacityVolume?: number;

  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;

  @IsString()
  @IsOptional()
  transporterId?: string;

  @IsString()
  @IsOptional()
  stnkNo?: string;

  @IsString()
  @IsOptional()
  stnkExpiry?: string;

  @IsString()
  @IsOptional()
  kirNo?: string;

  @IsString()
  @IsOptional()
  kirExpiry?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
