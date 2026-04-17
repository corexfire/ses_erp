import { IsIn, IsOptional, IsString } from 'class-validator';

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  subject?: string;

  @IsIn(priorities as unknown as string[])
  @IsOptional()
  priority?: (typeof priorities)[number];

  @IsIn(statuses as unknown as string[])
  @IsOptional()
  status?: (typeof statuses)[number];

  @IsString()
  @IsOptional()
  notes?: string;
}
