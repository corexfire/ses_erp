import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertSystemConfigDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'PENDING', 'INACTIVE'])
  status?: string;
}
