import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';

export class SignUpDto {
  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  username: string;

  @IsEmail({}, { message: ValidationMessages.MUST_BE_EMAIL })
  email: string;

  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  @MinLength(8, { message: ValidationMessages.MIN_LENGTH_IS + 8 })
  @Matches(
    /^(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>/\\?|])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: ValidationMessages.MUST_BE_VALID_PASSWORD },
  )
  password: string;

  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  firstName: string;

  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  lastName: string;

  @Matches(/^[A-Za-z0-9!@#$%^&*()_=+[\]{};:',.<>/\\?|]*$/, {
    message: ValidationMessages.MUST_BE_VALID_ACTIVATION_CODE_FORMAT,
  })
  activationCode: string;
}
