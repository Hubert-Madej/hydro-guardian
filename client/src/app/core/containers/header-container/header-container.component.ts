import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
})
export class HeaderContainerComponent {
  authUser$ = this.authService.getAuthUser();

  constructor(private readonly authService: AuthService) {}

  onSignOut(): void {
    this.authService.logout();
  }
}
