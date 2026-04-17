import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

const types = ['CALL', 'EMAIL', 'MEETING', 'TASK'] as const;
const statuses = ['OPEN', 'DONE', 'CANCELED'] as const;

export class CreateActivityDto {
  @IsIn(types as unknown as string[])
  type: (typeof types)[number];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueAt?: Date;

  @IsIn(statuses as unknown as string[])
  @IsOptional()
  status?: (typeof statuses)[number];

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  opportunityId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
