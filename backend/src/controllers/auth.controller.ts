import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SingItDto } from '../models/dto/sing-it.dto';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../models/dto/sign-up.dto';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<CognitoUser> {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  @Post('login')
  async signIn(@Body() signInDto: SingItDto): Promise<{ jwtToken: string }> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
