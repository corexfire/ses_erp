import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RfqItemDto } from './rfq-item.dto';

export class CreateRfqDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  issueDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  supplierIds?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RfqItemDto)
  items: RfqItemDto[];
}
