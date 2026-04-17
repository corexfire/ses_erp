import { IsEnum, IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';

export class UpdateNcrDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  rootCause?: string;

  @IsEnum(['PENDING', 'USE_AS_IS', 'REWORK', 'REPAIR', 'SCRAP', 'RETURN_TO_VENDOR'])
  @IsOptional()
  disposition?: 'PENDING' | 'USE_AS_IS' | 'REWORK' | 'REPAIR' | 'SCRAP' | 'RETURN_TO_VENDOR';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsOptional()
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @IsEnum(['DRAFT', 'OPEN', 'UNDER_INVESTIGATION', 'PENDING_APPROVAL', 'DISPOSITIONED', 'VERIFIED', 'CLOSED', 'VOID', 'REJECTED'])
  @IsOptional()
  status?: 'DRAFT' | 'OPEN' | 'UNDER_INVESTIGATION' | 'PENDING_APPROVAL' | 'DISPOSITIONED' | 'VERIFIED' | 'CLOSED' | 'VOID' | 'REJECTED';

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsUrl()
  @IsOptional()
  evidenceUrl?: string;

  @IsNumber()
  @IsOptional()
  qty?: number;
}
