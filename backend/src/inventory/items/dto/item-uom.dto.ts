import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateItemUomDto {
  @IsString()
  itemId!: string;

  @IsString()
  uomCode!: string;

  @IsBoolean()
  @IsOptional()
  isBase?: boolean;

  @IsNumber()
  @IsOptional()
  conversionRate?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateItemUomDto {
  @IsBoolean()
  @IsOptional()
  isBase?: boolean;

  @IsNumber()
  @IsOptional()
  conversionRate?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}