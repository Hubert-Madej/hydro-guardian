import { IsString } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';

export class SingItDto {
  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  email: string;

  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  password: string;
}
