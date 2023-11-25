import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import * as dayjs from 'dayjs';
import { Store } from '@ngrx/store';
import { LoginFormPayload } from '../models/interfaces/login-form-payload.interface';
import { authActions } from '../state/actions/auth.actions';
import { map, Observable, take } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { getAuthToken, getAuthUser } from '../state/selectors/auth.selectors';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN_KEY } from '../../shared/config/application';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly store: Store,
    private readonly cookieService: CookieService,
  ) {}

  login(loginFormPayload: LoginFormPayload): void {
    this.store.dispatch(authActions.login({ loginFormPayload }));
  }

  autoLogin() {
    return this.store
      .select(getAuthToken)
      .pipe(
        take(1),
        map((token) => {
          if (!token) {
            token = this.#retrieveToken();
            if (token && !this.#isExpired(token)) {
              this.store.dispatch(authActions.autoLogin({ token: this.#retrieveToken() }));
            } else {
              this.store.dispatch(authActions.clearAuthState());
              return undefined;
            }
          }

          return token;
        }),
      )
      .subscribe();
  }

  logout(): void {
    this.store.dispatch(authActions.logOut());
  }

  getToken(): Observable<string | null> {
    return this.store.select(getAuthToken);
  }

  getAuthUser(): Observable<AuthUser | null> {
    return this.store.select(getAuthUser);
  }

  getExpirationDate(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    return dayjs.unix(decoded.exp).toDate();
  }

  #isExpired(token: string): boolean {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    return now > decoded.exp;
  }

  #retrieveToken(): string {
    return this.cookieService.get(ACCESS_TOKEN_KEY);
  }
}
