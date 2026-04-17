import { IsString, IsOptional, IsDateString, IsUUID, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PackingItemDto {
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  qty: number;

  @IsOptional()
  @IsString()
  uomCode?: string;
}

export class CreatePackingDto {
  @IsDateString()
  packingDate: string;

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
  @Type(() => PackingItemDto)
  items: PackingItemDto[];
}

export class UpdatePackingDto {
  @IsOptional()
  @IsDateString()
  packingDate?: string;

  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackingItemDto)
  items?: PackingItemDto[];
}