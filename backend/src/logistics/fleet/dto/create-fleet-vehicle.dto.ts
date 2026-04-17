import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { VehicleOwnershipType, VehicleStatus } from '../../../../prisma/generated/client';

export class CreateFleetVehicleDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  plateNo: string;

  @IsString()
  @IsNotEmpty()
  vehicleType: string;

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
  @IsNotEmpty()
  capacityWeight: number;

  @IsNumber()
  @IsNotEmpty()
  capacityVolume: number;

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
