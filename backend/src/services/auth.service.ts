import { Injectable } from '@nestjs/common';
import { SingItDto } from '../models/dto/sing-it.dto';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { SignUpDto } from '../models/dto/sign-up.dto';
import { UserRoles } from '../models/enums/user-roles.enum';

@Injectable()
export class AuthService {
  private readonly cognitoUserPool: CognitoUserPool;
  constructor(private readonly configService: ConfigService) {
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async signUp(signUpDto: SignUpDto) {
    return new Promise<CognitoUser>((resolve, reject) => {
      return this.cognitoUserPool.signUp(
        signUpDto.email,
        signUpDto.password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: signUpDto.email }),
          new CognitoUserAttribute({
            Name: 'given_name',
            Value: signUpDto.firstName,
          }),
          new CognitoUserAttribute({
            Name: 'family_name',
            Value: signUpDto.lastName,
          }),
          new CognitoUserAttribute({
            Name: 'custom:role',
            Value: UserRoles.CUSTOMER,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async signIn(signInDto: SingItDto): Promise<{ jwtToken: string }> {
    const authenticationDetails = new AuthenticationDetails({
      Username: signInDto.email,
      Password: signInDto.password,
    });

    const userData = {
      Username: signInDto.email,
      Pool: this.cognitoUserPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const jwtToken = result.getAccessToken().getJwtToken();
          resolve({ jwtToken });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
