import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

const stages = [
  'QUALIFICATION',
  'PROPOSAL',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
] as const;

export class UpdateOpportunityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsIn(stages as unknown as string[])
  @IsOptional()
  stage?: (typeof stages)[number];

  @IsNumberString()
  @IsOptional()
  expectedValue?: string;

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  closeDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
