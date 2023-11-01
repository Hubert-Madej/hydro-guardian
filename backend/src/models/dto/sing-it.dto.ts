import { IsEmail, IsString } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';

export class SingItDto {
  @IsEmail({}, { message: ValidationMessages.MUST_BE_EMAIL })
  email: string;

  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  password: string;
}
