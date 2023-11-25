import { Component } from '@angular/core';
import { LoginFormPayload } from '../../models/interfaces/login-form-payload.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent {
  constructor(private readonly authService: AuthService) {}

  onSignIn(loginFormPayload: LoginFormPayload): void {
    this.authService.login(loginFormPayload);
  }
}
