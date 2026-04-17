import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsNumber, IsDateString } from 'class-validator';
import { FsmServiceType, TicketPriority } from '../../../prisma/generated/client';

export class CreateFsmServiceOrderDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsEnum(FsmServiceType)
  @IsOptional()
  serviceType?: FsmServiceType;

  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  locationAddress?: string;

  @IsNumber()
  @IsOptional()
  coordinateLat?: number;

  @IsNumber()
  @IsOptional()
  coordinateLng?: number;

  @IsDateString()
  @IsOptional()
  slaDate?: string;

  @IsDateString()
  @IsOptional()
  preferredDate?: string;

  @IsInt()
  @IsOptional()
  totalEstimatedDuration?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
