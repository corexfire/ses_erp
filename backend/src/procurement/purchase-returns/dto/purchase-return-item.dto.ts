import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PurchaseReturnItemDto {
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

  @IsString()
  @IsOptional()
  taxCodeId?: string;
}
