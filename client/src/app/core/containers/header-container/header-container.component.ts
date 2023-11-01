import { Component } from '@angular/core';
import { AuthFacade } from '../../../auth/services/auth.facade';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
})
export class HeaderContainerComponent {
  constructor(private authFacade: AuthFacade) {}

  onSignOut(): void {
    this.authFacade.signOut();
  }
}
