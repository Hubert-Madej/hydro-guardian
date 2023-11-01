import { IsEmail } from 'class-validator';
import { ValidationMessages } from '../enums/validation-messages.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description:
      'Email of the user we want to invite to create an account in the application.',
    required: true,
  })
  @IsEmail({}, { message: ValidationMessages.MUST_BE_EMAIL })
  email: string;
}
