import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export class UpdateCapaDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  rootCause?: string;

  @IsString()
  @IsOptional()
  correctiveAction?: string;

  @IsString()
  @IsOptional()
  preventiveAction?: string;

  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @IsEnum(['DRAFT', 'OPEN', 'UNDER_REVIEW', 'IMPLEMENTING', 'VERIFYING', 'CLOSED', 'VOID'])
  @IsOptional()
  status?: 'DRAFT' | 'OPEN' | 'UNDER_REVIEW' | 'IMPLEMENTING' | 'VERIFYING' | 'CLOSED' | 'VOID';

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsString()
  @IsOptional()
  findings?: string;

  @IsString()
  @IsOptional()
  evidenceUrl?: string;
}
