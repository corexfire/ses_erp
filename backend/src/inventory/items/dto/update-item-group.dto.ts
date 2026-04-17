import { IsOptional, IsString } from 'class-validator';

export class UpdateItemGroupDto {
  @IsString()
  @IsOptional()
  name?: string;
}
