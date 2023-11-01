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
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { Roles } from '../decorators/role.decorator';
import { UserRoles } from '../models/enums/user-roles.enum';
import { CreateInvitationDto } from '../models/dto/create-invitation.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponsesDescriptions } from '../swagger/responses-descriptions/auth-responses-descriptions.swagger';
import { AuthUser } from '../models/interfaces/auth-user.interface';
import {
  CurrentUserExampleResponse,
  SignInExampleResponse,
} from '../swagger/example-responses/auth-example-responses.swagger';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('[HYDRO-GUARDIAN] Auth Module')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @ApiOperation({
    summary: 'Allows the invited user to register in the system.',
  })
  @ApiResponse(AuthResponsesDescriptions.signUp.success)
  @ApiResponse(AuthResponsesDescriptions.signUp.invalidInvitationCode)
  @ApiResponse(AuthResponsesDescriptions.signUp.invitationDoesNotExists)
  //@ts-ignore
  @ApiResponse(AuthResponsesDescriptions.signUp.cognitoAuthError)
  @ApiBody({ type: SignUpDto })
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Allows the user to sign-in in the system.' })
  @ApiResponse(AuthResponsesDescriptions.signIn.success)
  //@ts-ignore
  @ApiResponse(AuthResponsesDescriptions.signIn.cognitoAuthError)
  @ApiOkResponse({ type: SignInExampleResponse })
  @ApiBody({ type: SingItDto })
  async signIn(@Body() signInDto: SingItDto): Promise<{ jwtToken: string }> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('current-user')
  @ApiOperation({ summary: 'Return current user data based on token payload.' })
  @ApiResponse(AuthResponsesDescriptions.signIn.success)
  @ApiOkResponse({ type: CurrentUserExampleResponse })
  async currentUser(@User() user: AuthUser): Promise<AuthUser> {
    return user;
  }

  @Post('create-invitation')
  @Roles([UserRoles.ADMIN])
  @ApiOperation({
    summary: 'Allows authorized users to create invitations to the system.',
  })
  @ApiResponse(AuthResponsesDescriptions.createInvitation.success)
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<void> {
    return this.authService.createInvitation(createInvitationDto);
  }
}
