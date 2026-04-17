import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateProgressClaimDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  claimNo!: string;

  @IsNumber()
  @IsNotEmpty()
  progressPercent!: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateProgressInvoiceDto {
  @IsString()
  @IsNotEmpty()
  progressClaimId!: string;

  @IsNumber()
  @IsOptional()
  retentionPercent?: number;

  @IsNumber()
  @IsOptional()
  dpDeductionAmount?: number;
}
