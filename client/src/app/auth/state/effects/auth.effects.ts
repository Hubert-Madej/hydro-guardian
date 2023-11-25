import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../../services/auth-api.service';
import { authActions } from '../actions/auth.actions';
import { debounceTime, map, switchMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { SignInResponse } from '../../models/interfaces/sign-in-response.interface';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_KEY } from '../../../shared/config/application';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap((action) =>
        this.authApiService.signIn(action.loginFormPayload).pipe(
          map((signInResponse: SignInResponse) => {
            const { jwtToken } = signInResponse;
            const expires = this.authService.getExpirationDate(jwtToken);
            this.cookieService.set(ACCESS_TOKEN_KEY, jwtToken, expires, '/', location.hostname);

            return authActions.loginSuccess({ signInResponse });
          }),
        ),
      ),
    ),
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      map((action) => authActions.loginSuccess({ signInResponse: { jwtToken: action.token } })),
    ),
  );

  loadAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSuccess),
      debounceTime(100),
      switchMap(() => {
        return this.authApiService.loadCurrentUser().pipe(
          tap(() => this.router.navigate(['/'])),
          map((authUser) => authActions.loadAuthUserSuccess({ authUser })),
        );
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logOut),
      tap(() => this.router.navigate(['/login'])),
      switchMap(() => {
        this.cookieService.delete(ACCESS_TOKEN_KEY, '/', location.hostname);

        return this.authApiService.signOut().pipe(map(() => authActions.clearAuthState()));
      }),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly cookieService: CookieService,
    private readonly authApiService: AuthApiService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
