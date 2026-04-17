import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateInProcessQcDto {
  @IsString()
  workOrderId!: string;

  @IsNumber()
  qtyInspected!: number;

  @IsNumber()
  qtyPassed!: number;

  @IsNumber()
  qtyFailed!: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInProcessQcDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  qtyInspected?: number;

  @IsNumber()
  @IsOptional()
  qtyPassed?: number;

  @IsNumber()
  @IsOptional()
  qtyFailed?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}