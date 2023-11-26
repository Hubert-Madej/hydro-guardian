import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginFormPayload } from '../../models/interfaces/login-form-payload.interface';
import { SignInResponse } from '../../models/interfaces/sign-in-response.interface';
import { AuthUser } from '../../models/auth-user.model';

export const authActions = createActionGroup({
  source: 'Auth API',
  events: {
    Login: props<{ loginFormPayload: LoginFormPayload }>(),
    'Login Success': props<{ signInResponse: SignInResponse }>(),
    'Auto Login': props<{ token: string }>(),
    'Load Auth User': emptyProps(),
    'Load Auth User Success': props<{ authUser: AuthUser }>(),
    'Clear Auth State': emptyProps(),
    'Log Out': emptyProps(),
  },
});
