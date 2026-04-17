import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { ShipmentStatus } from '../../../../prisma/generated/client';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsString()
  @IsOptional()
  carrierId?: string;

  @IsString()
  @IsOptional()
  trackingNo?: string;

  @IsString()
  @IsOptional()
  shipDate?: string;

  @IsString()
  @IsOptional()
  deliveryDate?: string;

  @IsString()
  @IsOptional()
  @IsIn(['CREATED', 'SHIPPED', 'DELIVERED', 'CANCELED'])
  status?: ShipmentStatus;
}
