import { Injectable } from '@angular/core'
import { LoginFormPayload } from '../models/login-form-payload.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor() {}

  signIn(loginFormPayload: LoginFormPayload) {
    console.log('POST!')
  }
}
