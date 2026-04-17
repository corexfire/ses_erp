import { IsString, IsOptional, IsDateString, IsArray, IsEnum, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateHandoverDto {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  serviceOrderId?: string;

  @IsString()
  customerId: string;

  @IsString()
  technicianId: string;

  @IsString()
  @IsOptional()
  equipmentId?: string;

  @IsDateString()
  handoverDate: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  recipientName: string;

  @IsString()
  @IsOptional()
  recipientPhone?: string;

  @IsString()
  @IsOptional()
  recipientTitle?: string;

  @IsArray()
  @IsOptional()
  checklist?: any;

  @IsArray()
  @IsOptional()
  photos?: any;

  @IsString()
  @IsOptional()
  clientSignature?: string;

  @IsString()
  @IsOptional()
  technicianSignature?: string;

  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateHandoverDto extends PartialType(CreateHandoverDto) {}
