import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceRuleDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsOptional()
  priority?: string;

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

  @IsString()
  @IsOptional()
  customerGroup?: string;
}
