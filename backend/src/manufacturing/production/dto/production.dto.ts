import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductionIssueItemDto {
  @IsString()
  itemId!: string;

  @IsNumber()
  qty!: number;

  @IsString()
  @IsOptional()
  uomCode?: string;
}

export class CreateProductionIssueDto {
  @IsString()
  code!: string;

  @IsString()
  workOrderId!: string;

  @IsDateString()
  issueDate!: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductionIssueItemDto)
  items!: CreateProductionIssueItemDto[];
}

export class CreateProductionReceiptDto {
  @IsString()
  code!: string;

  @IsString()
  workOrderId!: string;

  @IsDateString()
  receiptDate!: string;

  @IsNumber()
  qtyProduced!: number;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}