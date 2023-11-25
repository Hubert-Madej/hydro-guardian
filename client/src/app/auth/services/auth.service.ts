import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import * as dayjs from 'dayjs';
import { Store } from '@ngrx/store';
import { LoginFormPayload } from '../models/interfaces/login-form-payload.interface';
import { authActions } from '../state/actions/auth.actions';
import { map, Observable, take } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { getAuthToken, getAuthUser, getTokenExpirationDate } from '../state/selectors/auth.selectors';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cookieTokenKey = 'access_token';

  constructor(
    private readonly store: Store,
    private cookieService: CookieService,
  ) {}

  private static isExpired(token: string): boolean {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    return now > decoded.exp;
  }

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
            token = this.retrieveToken();
            if (token && !AuthService.isExpired(token)) {
              this.store.dispatch(authActions.autoLogin({ token: this.retrieveToken() }));
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

  getTokenExpirationDate(): Observable<Date | null> {
    return this.store.select(getTokenExpirationDate);
  }

  getExpirationDate(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    return dayjs.unix(decoded.exp).toDate();
  }

  private retrieveToken(): string {
    return this.cookieService.get(this.cookieTokenKey);
  }
}
