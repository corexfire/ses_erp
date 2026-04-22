import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVehicleDocumentDto {
  @IsString()
  documentType!: string;

  @IsString()
  documentNumber!: string;

  @IsString()
  @IsOptional()
  issueDate?: string;

  @IsString()
  @IsOptional()
  expiryDate?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateVehicleDocumentDto extends PartialType(CreateVehicleDocumentDto) {}
