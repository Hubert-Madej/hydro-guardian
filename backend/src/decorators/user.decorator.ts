import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {
  AuthUser,
  CognitoRawUser,
} from '../models/interfaces/auth-user.interface';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUser => {
    const req: Request = ctx.switchToHttp().getRequest();

    const cognitoRawUser = req.user as CognitoRawUser;

    return {
      uuid: cognitoRawUser.sub,
      email: cognitoRawUser.email,
      emailVerified: cognitoRawUser.email_verified,
      familyName: cognitoRawUser.family_name,
      givenName: cognitoRawUser.given_name,
      username: cognitoRawUser['cognito:username'],
      role: cognitoRawUser['custom:role'],
    };
  },
);
