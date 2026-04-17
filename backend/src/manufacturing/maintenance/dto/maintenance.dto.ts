import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  criticality?: string;

  @IsDateString()
  @IsOptional()
  purchaseDate?: string;

  @IsDateString()
  @IsOptional()
  warrantyExpiryDate?: string;

  @IsString()
  @IsOptional()
  workCenterId?: string;

  @IsDateString()
  @IsOptional()
  installedDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateMaintenanceScheduleDto {
  @IsString()
  @IsNotEmpty()
  equipmentId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  frequency!: string;

  @IsNumber()
  intervalDays!: number;

  @IsDateString()
  @IsNotEmpty()
  nextDate!: string;

  @IsArray()
  @IsOptional()
  tasks?: string[];
}

export class CreateMaintenanceRequestDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  equipmentId!: string;

  @IsDateString()
  @IsNotEmpty()
  requestDate!: string;

  @IsString()
  @IsNotEmpty()
  problem!: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateMaintenanceRequestDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateLogPartDto {
  @IsString()
  @IsNotEmpty()
  itemId!: string;

  @IsString()
  @IsNotEmpty()
  warehouseId!: string;

  @IsNumber()
  qtyUsed!: number;

  @IsNumber()
  unitCost!: number;
}

export class CreateMaintenanceLogDto {
  @IsString()
  @IsNotEmpty()
  equipmentId!: string;

  @IsString()
  @IsOptional()
  requestId?: string;

  @IsString()
  @IsOptional()
  scheduleId?: string;

  @IsString()
  @IsNotEmpty()
  technicianName!: string;

  @IsString()
  @IsNotEmpty()
  workType!: string;

  @IsNumber()
  durationMin!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsOptional()
  laborCost?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLogPartDto)
  parts?: CreateLogPartDto[];
}