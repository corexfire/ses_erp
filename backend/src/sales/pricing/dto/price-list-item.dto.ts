import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PriceListItemDto {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsNumberString()
  unitPrice: string;

  @IsString()
  @IsNotEmpty()
  effectiveDate: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  customerId?: string;
}
