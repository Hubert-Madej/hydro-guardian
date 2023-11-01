import { IsEmail } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';

export class CreateInvitationDto {
  @IsEmail({}, { message: ValidationMessages.MUST_BE_EMAIL })
  email: string;
}
