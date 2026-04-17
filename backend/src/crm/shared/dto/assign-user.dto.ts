import { IsOptional, IsString } from 'class-validator';

export class AssignUserDto {
  @IsString()
  @IsOptional()
  userId?: string;
}
