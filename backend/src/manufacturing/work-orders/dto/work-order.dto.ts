import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkOrderComponentDto {
  @IsString()
  itemId!: string;

  @IsNumber()
  qtyRequired!: number;

  @IsString()
  @IsOptional()
  uomCode?: string;
}

export class CreateWorkOrderOperationDto {
  @IsNumber()
  lineNo!: number;

  @IsNumber()
  operationNo!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  workstation?: string;

  @IsNumber()
  @IsOptional()
  laborHours?: number;
}

export class CreateWorkOrderDto {
  @IsString()
  code!: string;

  @IsString()
  @IsOptional()
  bomId?: string;

  @IsString()
  finishedGoodItemId!: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;

  @IsNumber()
  qtyPlanned!: number;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsDateString()
  @IsOptional()
  plannedStartDate?: string;

  @IsDateString()
  @IsOptional()
  plannedEndDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkOrderComponentDto)
  @IsOptional()
  components?: CreateWorkOrderComponentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkOrderOperationDto)
  @IsOptional()
  operations?: CreateWorkOrderOperationDto[];
}

export class UpdateWorkOrderDto {
  @IsNumber()
  @IsOptional()
  qtyPlanned?: number;

  @IsDateString()
  @IsOptional()
  plannedStartDate?: string;

  @IsDateString()
  @IsOptional()
  plannedEndDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}