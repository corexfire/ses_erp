import { IsString, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { FsmAppointmentStatus } from '../../../prisma/generated/client';

export class UpdateFsmAppointmentDto {
  @IsEnum(FsmAppointmentStatus)
  @IsOptional()
  status?: FsmAppointmentStatus;

  @IsString()
  @IsOptional()
  technicianId?: string;

  @IsDateString()
  @IsOptional()
  scheduledStart?: string;

  @IsDateString()
  @IsOptional()
  scheduledEnd?: string;

  @IsDateString()
  @IsOptional()
  actualStart?: string;

  @IsDateString()
  @IsOptional()
  actualEnd?: string;

  @IsInt()
  @IsOptional()
  travelTimeMin?: number;

  @IsInt()
  @IsOptional()
  workingTimeMin?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
