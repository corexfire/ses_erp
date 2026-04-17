import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LandedCostAllocationDto } from './landed-cost-allocation.dto';

export class CreateLandedCostDto {
  @IsString()
  @IsNotEmpty()
  code: string;

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
  @IsNotEmpty()
  costDate: string;

  @IsString()
  @IsNotEmpty()
  totalAmount: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LandedCostAllocationDto)
  allocations?: LandedCostAllocationDto[];
}
