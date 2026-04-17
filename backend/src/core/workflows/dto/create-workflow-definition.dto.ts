import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkflowDefinitionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  moduleKey: string;

  @IsString()
  @IsNotEmpty()
  docType: string;
}
