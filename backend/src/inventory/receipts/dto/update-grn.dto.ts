import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { GrnItemDto } from './grn-item.dto';

export class UpdateGrnDto {
  @IsString()
  @IsOptional()
  receiptDate?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;

  @IsString()
  @IsOptional()
  supplierId?: string;

  @IsString()
  @IsOptional()
  purchaseOrderId?: string;

  @IsString()
  @IsOptional()
  purchaseInvoiceId?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GrnItemDto)
  items?: GrnItemDto[];
}
