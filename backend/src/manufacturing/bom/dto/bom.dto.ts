import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBomItemDto {
  @IsString()
  componentItemId!: string;

  @IsNumber()
  qty!: number;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsString()
  @IsOptional()
  issueMethod?: string;

  @IsNumber()
  @IsOptional()
  operationNo?: number;

  @IsNumber()
  @IsOptional()
  scrapPercent?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateBomOperationDto {
  @IsNumber()
  operationNo!: number;

  @IsString()
  description!: string;

  @IsString()
  @IsOptional()
  workstation?: string;

  @IsNumber()
  @IsOptional()
  setupTime?: number;

  @IsNumber()
  @IsOptional()
  cycleTime?: number;

  @IsNumber()
  @IsOptional()
  laborScrap?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateBomDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsString()
  itemId!: string;

  @IsString()
  @IsOptional()
  bomType?: string;

  @IsNumber()
  @IsOptional()
  baseQty?: number;

  @IsString()
  @IsOptional()
  costingMethod?: string;

  @IsNumber()
  @IsOptional()
  version?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBomItemDto)
  items!: CreateBomItemDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBomOperationDto)
  operations?: CreateBomOperationDto[];
}

export class UpdateBomDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateBomItemDto {
  @IsNumber()
  @IsOptional()
  qty?: number;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsNumber()
  @IsOptional()
  scrapPercent?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
