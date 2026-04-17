import { IsString, IsOptional, IsDateString, IsInt, IsArray } from 'class-validator';

export class CreateWavePickingDto {
  @IsString()
  warehouseId: string;

  @IsDateString()
  plannedDate: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @IsString({ each: true })
  deliveryOrderIds: string[];
}
