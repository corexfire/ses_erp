import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @IsString()
  @IsNotEmpty()
  baseCurrencyId: string;

  @IsString()
  @IsNotEmpty()
  quoteCurrencyId: string;

  @IsNumberString()
  @IsNotEmpty()
  rate: string;

  @Type(() => Date)
  @IsDate()
  rateDate: Date;
}
