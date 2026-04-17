import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateSparePartDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  itemGroupId?: string;

  @IsString()
  @IsOptional()
  baseUomCode?: string;

  @IsString()
  @IsOptional()
  @IsIn(['NONE', 'BATCH', 'SERIAL'])
  trackingType?: string;

  @IsString()
  @IsOptional()
  @IsIn(['MOVING_AVERAGE', 'FIFO'])
  valuationMethod?: string;

  @IsNumberString()
  @IsOptional()
  reorderPoint?: string;

  @IsNumberString()
  @IsOptional()
  reorderQty?: string;

  @IsString()
  @IsOptional()
  oemPartNumber?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  compatibleEquipmentIds?: string[];
}
