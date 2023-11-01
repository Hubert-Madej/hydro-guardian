import { IsEmail, IsString } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SingItDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description:
      'Email linked to this account. This value should be equal to the one, that was provided on invitation creation step.',
    required: true,
  })
  @IsEmail({}, { message: ValidationMessages.MUST_BE_EMAIL })
  email: string;

  @ApiProperty({
    example: 'Abc123!Abc',
    description:
      'Password that should match default AWS Cognito Policy. https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html',
    required: true,
  })
  @IsString({ message: ValidationMessages.MUST_BE_STRING })
  password: string;
}
