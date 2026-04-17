import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PriceListItemDto } from './price-list-item.dto';

export class CreatePriceListDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PriceListItemDto)
  items?: PriceListItemDto[];
}
