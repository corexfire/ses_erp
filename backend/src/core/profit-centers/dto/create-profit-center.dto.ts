import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfitCenterDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
