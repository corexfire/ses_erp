import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SalesOrderItemDto } from './sales-order-item.dto';

export class CreateSalesOrderDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsOptional()
  quotationId?: string;

  @IsString()
  @IsNotEmpty()
  orderDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesOrderItemDto)
  items: SalesOrderItemDto[];
}
