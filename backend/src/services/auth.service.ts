import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { CreateInvitationDto } from '../models/dto/create-invitation.dto';
import { RedisKeys } from '../models/enums/redis-keys.enum';
import { RedisTTL } from '../models/constants/redis-ttl';
import { ExceptionMessages } from '../models/enums/exception-messages.enum';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly cognitoUserPool: CognitoUserPool;
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const userVerificationCode = await this.cacheService.get(
      `${RedisKeys.VERIFICATION_CODE}_${signUpDto.email}`,
    );

    if (!userVerificationCode) {
      throw new NotFoundException(ExceptionMessages.INVITATION_NOT_FOUND);
    }

    if (signUpDto.invitationCode !== userVerificationCode) {
      throw new BadRequestException(ExceptionMessages.INVALID_INVITATION_CODE);
    }

    return new Promise<void>((resolve, reject) => {
      return this.cognitoUserPool.signUp(
        signUpDto.email,
        signUpDto.password,
        [
          new CognitoUserAttribute({
            Name: 'email',
            Value: signUpDto.email,
          }),
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
            resolve();
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
          const jwtToken = result.getIdToken().getJwtToken();
          resolve({ jwtToken });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<void> {
    const verificationCode = crypto.randomBytes(6).toString('base64');
    await this.cacheService.set(
      `${RedisKeys.VERIFICATION_CODE}_${createInvitationDto.email}`,
      verificationCode,
      RedisTTL[RedisKeys.VERIFICATION_CODE],
    );

    // @TODO SEND INVITATION CODE TO THE PROVIDED MAIL VIA SENDGRID
  }
}
