import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PurchaseRequisitionItemDto } from './purchase-requisition-item.dto';

export class UpdatePurchaseRequisitionDto {
  @IsString()
  @IsOptional()
  requestDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequisitionItemDto)
  items?: PurchaseRequisitionItemDto[];
}
