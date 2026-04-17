import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PurchaseReturnItemDto } from './purchase-return-item.dto';

export class UpdatePurchaseReturnDto {
  @IsString()
  @IsOptional()
  returnDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PurchaseReturnItemDto)
  items?: PurchaseReturnItemDto[];
}
