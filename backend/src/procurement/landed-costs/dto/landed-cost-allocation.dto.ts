import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LandedCostAllocationDto {
  @IsString()
  @IsNotEmpty()
  costComponent: string;

  @IsNumberString()
  amount: string;
}
