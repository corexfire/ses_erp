import { IsBoolean, IsHexColor, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpsertPrintFormatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  docType: string;

  @IsString()
  @IsNotEmpty()
  module: string;

  @IsString()
  @IsOptional()
  paperSize?: string;

  @IsString()
  @IsOptional()
  orientation?: string;

  @IsString()
  @IsOptional()
  fontFamily?: string;

  @IsString()
  @IsOptional()
  margin?: string;

  @IsHexColor()
  @IsOptional()
  accentColor?: string;

  @IsHexColor()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  footerText?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'DRAFT', 'INACTIVE'])
  status?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsBoolean()
  @IsOptional()
  showLogo?: boolean;

  @IsBoolean()
  @IsOptional()
  showShippingAddress?: boolean;

  @IsBoolean()
  @IsOptional()
  showTax?: boolean;

  @IsBoolean()
  @IsOptional()
  showDiscount?: boolean;

  @IsBoolean()
  @IsOptional()
  showNotes?: boolean;

  @IsBoolean()
  @IsOptional()
  showSignature?: boolean;

  @IsBoolean()
  @IsOptional()
  showBankInfo?: boolean;

  @IsBoolean()
  @IsOptional()
  showQrCode?: boolean;

  @IsInt()
  @IsOptional()
  @Min(0)
  usageCount?: number;

  @IsString()
  @IsOptional()
  @IsIn(['DOCUMENT', 'TAG'])
  formatType?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  width?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  height?: number;

  @IsString()
  @IsOptional()
  barcodeType?: string;

  @IsBoolean()
  @IsOptional()
  showBarcode?: boolean;

  @IsBoolean()
  @IsOptional()
  showPrice?: boolean;

  @IsBoolean()
  @IsOptional()
  showItemCode?: boolean;
}
