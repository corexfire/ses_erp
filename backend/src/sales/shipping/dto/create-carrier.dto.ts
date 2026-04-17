import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarrierDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
