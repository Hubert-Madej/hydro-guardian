import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../models/enums/user-roles.enum';

export class CurrentUserExampleResponse {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: true })
  emailVerified: boolean;

  @ApiProperty({ example: 'he68g365-e90b-3318-99c5-dd4dd1dce524' })
  username: string;

  @ApiProperty({ example: UserRoles.CUSTOMER })
  role: string;

  @ApiProperty({
    example: 'John',
  })
  familyName: string;

  @ApiProperty({
    example: 'Doe',
  })
  givenName: string;
}

export class SignInExampleResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjc5MjgyMzksInVzZXJSb2xlcyI6WyJBRE1JTiIsIkRCX1JFQUQiLCJEQl9XUklURSJdLCJ1c2VySWQiOjEyMzQ1LCJpYXQiOjE2Mjc5MjgxMTl9.8vTwsBOp8LSa0sdc0nWAUnmWAAgOnS0ElB3bfaiSRfQ',
  })
  jwtToken: string;
}
