import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GrnItemDto {
  @IsString()
  @IsOptional()
  itemId?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  qty: string;

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
