import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CalculateCostDto {
  @IsString()
  @IsNotEmpty()
  workOrderId!: string;

  @IsString()
  @IsNotEmpty()
  period!: string;

  @IsNumber()
  @IsOptional()
  fixedOverheadAmount?: number;

  @IsNumber()
  @IsOptional()
  variableOverheadRate?: number; // per labor hour
}

export class FinalizeCostDto {
  @IsString()
  @IsNotEmpty()
  costId!: string;
}
