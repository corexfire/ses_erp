import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PurchaseRequisitionItemDto } from './purchase-requisition-item.dto';

export class CreatePurchaseRequisitionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  requestDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequisitionItemDto)
  items: PurchaseRequisitionItemDto[];
}
