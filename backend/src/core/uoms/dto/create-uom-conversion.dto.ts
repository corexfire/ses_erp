import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateUomConversionDto {
  @IsString()
  @IsNotEmpty()
  fromUomId: string;

  @IsString()
  @IsNotEmpty()
  toUomId: string;

  @IsNumberString()
  @IsNotEmpty()
  factor: string;
}
