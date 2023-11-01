import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import gitInfo from '../../../../git-version.json';
import { AuthUser } from '../../../auth/models/auth-user.model';
import { AuthUserRoles } from '../../../auth/models/enums/auth-user-roles.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() authUser: AuthUser;
  @Output() signOut = new EventEmitter<void>();

  items: MenuItem[] | undefined;
  gitInfo = gitInfo;

  ngOnInit() {
    this.items = [
      {
        label: 'Devices',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
          },
        ],
      },
      {
        label: 'Users Management',
        icon: 'pi pi-user',
        visible: this.authUser.role === AuthUserRoles.ADMIN,
      },
      {
        label: 'Sign out',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.signOut.emit(),
      },
    ];
  }
}
