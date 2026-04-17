import { IsOptional, IsString } from 'class-validator';

export class UpdateQcDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
