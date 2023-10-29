import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private token$ = new BehaviorSubject<string>(undefined);
  private authUser$ = new BehaviorSubject<AuthUser>(undefined);
  private tokenExpirationDate$ = new BehaviorSubject<Date>(undefined);

  setToken(token: string): void {
    this.token$.next(token);
  }

  getToken(): string {
    return this.token$.getValue();
  }

  selectToken$(): Observable<string> {
    return this.token$.asObservable();
  }

  setAuthUser(authUser: AuthUser): void {
    this.authUser$.next(authUser);
  }

  selectAuthUser$(): Observable<AuthUser> {
    return this.authUser$.asObservable();
  }

  setTokenExpirationDate(tokenExpirationDate: Date): void {
    this.tokenExpirationDate$.next(tokenExpirationDate);
  }

  selectTokenExpirationDate(): Observable<Date> {
    return this.tokenExpirationDate$.asObservable();
  }
}
