import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsNumberString()
  @IsOptional()
  expectedValue?: string;

  @IsString()
  @IsOptional()
  closeDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
