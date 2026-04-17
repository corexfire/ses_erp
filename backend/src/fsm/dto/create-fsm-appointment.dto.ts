import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { FsmAppointmentStatus } from '../../../prisma/generated/client';

export class CreateFsmAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceOrderId: string;

  @IsString()
  @IsNotEmpty()
  technicianId: string;

  @IsEnum(FsmAppointmentStatus)
  @IsOptional()
  status?: FsmAppointmentStatus;

  @IsDateString()
  @IsNotEmpty()
  scheduledStart: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledEnd: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
