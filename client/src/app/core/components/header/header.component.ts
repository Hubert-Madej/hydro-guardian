import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import gitInfo from '../../../../git-version.json';
import { AuthUser } from '../../../auth/models/auth-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() authUser: AuthUser;
  @Output() onSignOut = new EventEmitter<void>();

  showMenu = false;

  gitInfo = gitInfo;

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  signOut() {
    this.onSignOut.emit();
  }
}
