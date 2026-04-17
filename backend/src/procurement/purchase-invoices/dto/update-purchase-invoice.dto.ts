import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PurchaseInvoiceItemDto } from './purchase-invoice-item.dto';

export class UpdatePurchaseInvoiceDto {
  @IsString()
  @IsOptional()
  invoiceDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PurchaseInvoiceItemDto)
  items?: PurchaseInvoiceItemDto[];
}
