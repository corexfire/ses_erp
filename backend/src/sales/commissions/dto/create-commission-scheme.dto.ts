import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCommissionSchemeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  rate: string;
}
