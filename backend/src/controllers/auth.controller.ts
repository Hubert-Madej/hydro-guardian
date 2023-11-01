import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { SingItDto } from '../models/dto/sing-it.dto';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../models/dto/sign-up.dto';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { AuthUser } from '../models/interfaces/auth-user.interface';
import { Roles } from '../decorators/role.decorator';
import { UserRoles } from '../models/enums/user-roles.enum';
import { CreateInvitationDto } from '../models/dto/create-invitation.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<CognitoUser> {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SingItDto): Promise<{ jwtToken: string }> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('current-user')
  async currentUser(@User() user: AuthUser): Promise<AuthUser> {
    return user;
  }

  @Post('create-invitation')
  @Roles([UserRoles.ADMIN])
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<void> {
    return this.authService.createInvitation(createInvitationDto);
  }
}
