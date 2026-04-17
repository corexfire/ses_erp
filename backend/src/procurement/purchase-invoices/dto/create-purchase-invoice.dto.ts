import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PurchaseInvoiceItemDto } from './purchase-invoice-item.dto';

export class CreatePurchaseInvoiceDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsString()
  @IsNotEmpty()
  invoiceDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseInvoiceItemDto)
  items: PurchaseInvoiceItemDto[];
}
