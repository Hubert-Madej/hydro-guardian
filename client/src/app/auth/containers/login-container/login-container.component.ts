import { Component } from '@angular/core';
import { AuthFacade } from '../../services/auth.facade';
import { LoginFormPayload } from '../../interfaces/login-form-payload.interface';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent {
  constructor(private readonly authFacade: AuthFacade) {}

  signIn(loginFormPayload: LoginFormPayload): void {
    this.authFacade.signIn(loginFormPayload);
  }
}
