import { Injectable } from '@angular/core'
import { AuthApi } from './auth.api'
import { LoginFormPayload } from '../models/login-form-payload.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private readonly authApi: AuthApi) {}

  signIn(loginFormPayload: LoginFormPayload): void {
    this.authApi.signIn(loginFormPayload)
  }
}
