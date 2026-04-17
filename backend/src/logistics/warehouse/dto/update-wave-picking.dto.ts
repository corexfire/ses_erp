import { IsString, IsOptional, IsEnum } from 'class-validator';
import type { WavePickingStatus } from '../../../../prisma/generated/client';

export class UpdateWavePickingDto {
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsEnum({} as any) // Dynamic enum
  status?: WavePickingStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
