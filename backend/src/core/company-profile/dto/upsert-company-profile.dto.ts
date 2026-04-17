import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpsertCompanyProfileDto {
  @IsString()
  @IsNotEmpty()
  legalName: string;

  @IsString()
  @IsOptional()
  tradeName?: string;

  @IsString()
  @IsOptional()
  npwp?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address1?: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : null))
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : null))
  longitude?: number;

  @IsString()
  @IsOptional()
  @IsIn(['KECIL', 'MENENGAH', 'BESAR'])
  companySize?: string;
}
