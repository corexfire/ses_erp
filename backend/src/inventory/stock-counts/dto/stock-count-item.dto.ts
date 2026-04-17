import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class StockCountItemDto {
  @IsString()
  @IsOptional()
  itemId?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  countedQty: string;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsString()
  @IsOptional()
  binLocationId?: string;

  @IsString()
  @IsOptional()
  batchCode?: string;

  @IsString()
  @IsOptional()
  serialNo?: string;
}
