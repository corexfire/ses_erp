import { IsString, IsOptional, IsDateString, IsUUID, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PickingItemDto {
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  qty: number;

  @IsOptional()
  @IsUUID()
  fromBinLocationId?: string;

  @IsOptional()
  @IsString()
  batchCode?: string;

  @IsOptional()
  @IsString()
  serialNo?: string;
}

export class CreatePickingDto {
  @IsDateString()
  pickingDate: string;

  @IsUUID()
  warehouseId: string;

  @IsOptional()
  @IsUUID()
  salesOrderId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PickingItemDto)
  items: PickingItemDto[];
}

export class UpdatePickingDto {
  @IsOptional()
  @IsDateString()
  pickingDate?: string;

  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PickingItemDto)
  items?: PickingItemDto[];
}