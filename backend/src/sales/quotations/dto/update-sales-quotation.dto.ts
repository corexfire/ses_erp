import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SalesQuotationItemDto } from './sales-quotation-item.dto';

export class UpdateSalesQuotationDto {
  @IsString()
  @IsOptional()
  issueDate?: string;

  @IsString()
  @IsOptional()
  expiryDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SalesQuotationItemDto)
  items?: SalesQuotationItemDto[];
}
