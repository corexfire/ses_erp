import { IsOptional, IsString } from 'class-validator';

export class UpdateCarrierDto {
  @IsString()
  @IsOptional()
  name?: string;
}
