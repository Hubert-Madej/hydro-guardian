import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../models/auth-user.model';
import { LoginFormPayload } from '../models/interfaces/login-form-payload.interface';
import { SignInResponse } from '../models/interfaces/sign-in-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  readonly baseUrl = environment.apiUrl + '/auth';
  constructor(private httpClient: HttpClient) {}

  signIn(loginFormPayload: LoginFormPayload): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, loginFormPayload);
  }

  signOut(): Observable<HttpResponse<void>> {
    return this.httpClient.post<HttpResponse<void>>(`${this.baseUrl}/sign-out`, {});
  }

  loadCurrentUser(): Observable<AuthUser> {
    return this.httpClient.get<AuthUser>(`${this.baseUrl}/current-user`);
  }
}
