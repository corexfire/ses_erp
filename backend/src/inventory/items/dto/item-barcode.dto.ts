import { IsString } from 'class-validator';

export class CreateItemBarcodeDto {
  @IsString()
  itemId!: string;

  @IsString()
  barcode!: string;
}