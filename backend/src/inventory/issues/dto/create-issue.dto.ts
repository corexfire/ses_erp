import { IsString, IsOptional, IsDateString, IsNumber, IsArray, ValidateNested, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class IssueItemDto {
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

  @IsUUID()
  warehouseId: string;

  @IsOptional()
  @IsUUID()
  binLocationId?: string;

  @IsOptional()
  @IsString()
  batchCode?: string;

  @IsOptional()
  @IsString()
  serialNo?: string;
}

export class CreateGoodsIssueDto {
  @IsDateString()
  issueDate: string;

  @IsUUID()
  warehouseId: string;

  @IsOptional()
  @IsString()
  referenceType?: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IssueItemDto)
  items: IssueItemDto[];
}

export class UpdateGoodsIssueDto {
  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  referenceType?: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IssueItemDto)
  items?: IssueItemDto[];
}