import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SalesInvoiceItemDto } from './sales-invoice-item.dto';

export class CreateSalesInvoiceDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

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
  @Type(() => SalesInvoiceItemDto)
  items: SalesInvoiceItemDto[];
}
