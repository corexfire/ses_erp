import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class TransferItemDto {
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
  fromBinLocationId?: string;

  @IsString()
  @IsOptional()
  toBinLocationId?: string;

  @IsString()
  @IsOptional()
  batchCode?: string;

  @IsString()
  @IsOptional()
  serialNo?: string;
}
