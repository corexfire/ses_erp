import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

const leadStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'WON'] as const;

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsIn(leadStatuses as unknown as string[])
  @IsOptional()
  status?: (typeof leadStatuses)[number];
}
