export interface AuthUser {
  email: string;
  emailVerified: boolean;
  username: string;
  role: string;
  familyName: string;
  givenName: string;
}

export interface CognitoRawUser {
  sub: string;
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  given_name: string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  'custom:role': string;
  iat: number;
  family_name: string;
  jti: string;
  email: string;
}
