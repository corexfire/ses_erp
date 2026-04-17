import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StockCountItemDto } from './stock-count-item.dto';

export class UpdateStockCountDto {
  @IsString()
  @IsOptional()
  countDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StockCountItemDto)
  items?: StockCountItemDto[];
}
