import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemGroupDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
