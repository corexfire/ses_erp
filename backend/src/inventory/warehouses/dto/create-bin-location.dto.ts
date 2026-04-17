import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BinType } from '../../../../prisma/generated/client';

export class CreateBinLocationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  zoneId?: string;

  @IsEnum(BinType)
  @IsOptional()
  type?: BinType;
}
