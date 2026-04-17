import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SalesOrderItemDto } from './sales-order-item.dto';

export class UpdateSalesOrderDto {
  @IsString()
  @IsOptional()
  orderDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SalesOrderItemDto)
  items?: SalesOrderItemDto[];
}
