import { IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateCapaDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  sourceNcrId?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  rootCause: string;

  @IsString()
  @IsNotEmpty()
  correctiveAction: string;

  @IsString()
  @IsNotEmpty()
  preventiveAction: string;

  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}
