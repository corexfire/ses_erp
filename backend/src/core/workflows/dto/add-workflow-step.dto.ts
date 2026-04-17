import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddWorkflowStepDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsOptional()
  name?: string;
}
