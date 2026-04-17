import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { LandedCostAllocationDto } from './landed-cost-allocation.dto';

export class UpdateLandedCostDto {
  @IsString()
  @IsOptional()
  supplierId?: string;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsString()
  @IsOptional()
  invoiceId?: string;

  @IsString()
  @IsOptional()
  costDate?: string;

  @IsString()
  @IsOptional()
  totalAmount?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LandedCostAllocationDto)
  allocations?: LandedCostAllocationDto[];
}
