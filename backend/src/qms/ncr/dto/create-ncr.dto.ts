import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateNcrDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  sourceType: string;

  @IsString()
  @IsOptional()
  itemId?: string;

  @IsNumber()
  qty: number;

  @IsString()
  @IsNotEmpty()
  ncrType: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsOptional()
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  qcId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsUrl()
  @IsOptional()
  evidenceUrl?: string;
}
