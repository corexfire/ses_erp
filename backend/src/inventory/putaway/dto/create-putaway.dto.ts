import { IsString, IsOptional, IsDateString, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PutawayItemDto {
  @IsOptional()
  @IsUUID()
  grnItemId?: string;

  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsString()
  description: string;

  qty: number;

  @IsOptional()
  @IsUUID()
  fromBinLocationId?: string;

  @IsOptional()
  @IsUUID()
  toBinLocationId?: string;

  @IsOptional()
  @IsString()
  batchCode?: string;

  @IsOptional()
  @IsString()
  serialNo?: string;
}

export class CreatePutawayDto {
  @IsDateString()
  putawayDate: string;

  @IsUUID()
  warehouseId: string;

  @IsOptional()
  @IsUUID()
  grnId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PutawayItemDto)
  items: PutawayItemDto[];
}

export class UpdatePutawayDto {
  @IsOptional()
  @IsDateString()
  putawayDate?: string;

  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PutawayItemDto)
  items?: PutawayItemDto[];
}