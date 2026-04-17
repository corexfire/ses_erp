import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RfqItemDto } from './rfq-item.dto';

export class UpdateRfqDto {
  @IsString()
  @IsOptional()
  issueDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  supplierIds?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RfqItemDto)
  items?: RfqItemDto[];
}
