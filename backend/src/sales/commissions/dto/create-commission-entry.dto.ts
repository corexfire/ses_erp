import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommissionEntryDto {
  @IsString()
  @IsNotEmpty()
  schemeId: string;

  @IsString()
  @IsOptional()
  invoiceId?: string;

  @IsString()
  @IsOptional()
  salesUserId?: string;

  @IsNumberString()
  baseAmount: string;

  @IsNumberString()
  amount: string;
}
