import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class RfqItemDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  qty: string;

  @IsString()
  @IsOptional()
  uomCode?: string;
}
