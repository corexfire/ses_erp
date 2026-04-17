import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SalesInvoiceItemDto } from './sales-invoice-item.dto';

export class UpdateSalesInvoiceDto {
  @IsString()
  @IsOptional()
  invoiceDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SalesInvoiceItemDto)
  items?: SalesInvoiceItemDto[];
}
