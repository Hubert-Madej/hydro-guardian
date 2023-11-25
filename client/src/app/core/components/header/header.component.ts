import { Component, EventEmitter, Input, Output } from '@angular/core';
import gitInfo from '../../../../git-version.json';
import { AuthUser } from '../../../auth/models/auth-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() authUser: AuthUser;
  @Output() signOut = new EventEmitter<void>();

  showMenu = false;

  gitInfo = gitInfo;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  signUserOut() {
    this.signOut.emit();
  }
}
