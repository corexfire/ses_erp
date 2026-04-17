import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

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
