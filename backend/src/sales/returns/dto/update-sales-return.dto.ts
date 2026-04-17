import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SalesReturnItemDto } from './sales-return-item.dto';

export class UpdateSalesReturnDto {
  @IsString()
  @IsOptional()
  returnDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SalesReturnItemDto)
  items?: SalesReturnItemDto[];
}
