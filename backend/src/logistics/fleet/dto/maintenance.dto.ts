import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVehicleMaintenanceDto {
  @IsString()
  maintenanceType!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  kmInterval?: number;

  @IsNumber()
  @IsOptional()
  dateInterval?: number;

  @IsString()
  @IsOptional()
  lastServiceAt?: string;

  @IsString()
  @IsOptional()
  nextServiceAt?: string;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  vendorId?: string;
}

export class UpdateVehicleMaintenanceDto extends PartialType(CreateVehicleMaintenanceDto) {}
