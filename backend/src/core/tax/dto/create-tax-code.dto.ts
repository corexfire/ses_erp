import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTaxCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  rate: string;

  @Type(() => Date)
  @IsDate()
  effectiveDate: Date;
}
