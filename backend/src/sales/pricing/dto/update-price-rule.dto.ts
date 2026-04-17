import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdatePriceRuleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  itemCode?: string;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsNumberString()
  @IsOptional()
  unitPrice?: string;

  @IsString()
  @IsOptional()
  effectiveDate?: string;

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
