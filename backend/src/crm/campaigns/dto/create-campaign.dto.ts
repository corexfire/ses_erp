import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

const statuses = ['PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELED'] as const;

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  channel?: string;

  @IsIn(statuses as unknown as string[])
  @IsOptional()
  status?: (typeof statuses)[number];

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsNumberString()
  @IsOptional()
  budget?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
