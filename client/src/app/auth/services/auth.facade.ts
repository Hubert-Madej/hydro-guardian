import { Injectable } from '@angular/core';
import { AuthApi } from './auth.api';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import * as dayjs from 'dayjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthState } from '../state/auth.state';
import { Router } from '@angular/router';
import { catchError, finalize, first, Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthUser } from '../models/auth-user.model';
import { LoginFormPayload } from '../models/interfaces/login-form-payload.interface';
import { SignInResponse } from '../models/interfaces/sign-in-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  cookieTokenKey = 'access_token';

  constructor(
    private authApi: AuthApi,
    private authState: AuthState,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  selectAuthUser$(): Observable<AuthUser> {
    return this.authState.selectAuthUser$();
  }

  signIn(loginFormPayload: LoginFormPayload): void {
    this.authApi
      .signIn(loginFormPayload)
      .pipe(first())
      .subscribe(
        (signInResponse: SignInResponse) => {
          this.saveToken(signInResponse.jwtToken);
          this.authApi.loadCurrentUser().subscribe((authUser) => this.authState.setAuthUser(authUser));
          this.router.navigate(['/']);
        },
        (errorResponse: HttpErrorResponse) => {
          this.clearToken();
          this.authState.setAuthUser(undefined);
        },
      );
  }

  signOut$(): Observable<HttpResponse<void> | boolean> {
    return this.authApi.signOut().pipe(
      first(),
      catchError((_) => of(true)),
      finalize(() => this.signOut()),
    );
  }

  signOut(): void {
    this.authState.setAuthUser(undefined);
    this.clearToken();
    this.router.navigate(['/login']);
  }

  getToken(): string {
    let token: string = this.authState.getToken();

    if (!token) {
      token = this.retrieveToken();
      if (token && !AuthFacade.isExpired(token)) {
        this.authState.setToken(token);
        this.authApi.loadCurrentUser().subscribe((authUser) => this.authState.setAuthUser(authUser));
      } else {
        this.authState.setAuthUser(undefined);
        return undefined;
      }
    }

    return token;
  }

  private saveToken(token: string) {
    this.storeToken(token);
    this.authState.setToken(token);
  }

  private storeToken(token: string): void {
    const expires = this.getExpirationDate(token);
    this.authState.setTokenExpirationDate(expires);
    this.cookieService.set(this.cookieTokenKey, token, expires, '/', location.hostname);
  }

  private clearToken(): void {
    this.authState.setToken(undefined);
    this.authState.setTokenExpirationDate(undefined);
    this.removeToken();
  }

  private retrieveToken(): string {
    return this.cookieService.get(this.cookieTokenKey);
  }

  private removeToken(): void {
    this.cookieService.delete(this.cookieTokenKey, '/', location.hostname);
  }

  private getExpirationDate(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    return dayjs.unix(decoded.exp).toDate();
  }

  private static isExpired(token: string): boolean {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    return now > decoded.exp;
  }
}
