import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PurchaseOrderItemDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  qty: string;

  @IsString()
  @IsOptional()
  uomCode?: string;

  @IsNumberString()
  unitPrice: string;

  @IsNumberString()
  @IsOptional()
  discount?: string;

  @IsString()
  @IsOptional()
  taxCodeId?: string;
}
