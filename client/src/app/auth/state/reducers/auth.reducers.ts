import { AuthUser } from '../../models/auth-user.model';
import { createReducer, on } from '@ngrx/store';
import { authActions } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  authUser: AuthUser | null;
  tokenExpirationDate: Date | null;
}

const initialState: AuthState = {
  token: null,
  authUser: null,
  tokenExpirationDate: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, action): AuthState => {
    return { ...state, token: action.signInResponse.jwtToken };
  }),
  on(authActions.loadAuthUserSuccess, (state, action): AuthState => {
    return { ...state, authUser: action.authUser };
  }),
  on(authActions.clearAuthState, (): AuthState => {
    return { ...initialState };
  }),
);
