import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { WarehouseType } from '../../../../prisma/generated/client';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(WarehouseType)
  @IsOptional()
  type?: WarehouseType;

  @IsString()
  @IsOptional()
  address1?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  managerId?: string;

  @IsNumber()
  @IsOptional()
  capacityWeight?: number;

  @IsNumber()
  @IsOptional()
  capacityVolume?: number;
}
