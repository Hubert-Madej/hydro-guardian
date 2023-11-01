import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import gitInfo from '../../../../git-version.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() signOut = new EventEmitter<void>();

  items: MenuItem[] | undefined;
  gitInfo = gitInfo;

  constructor() {}

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
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.signOut.emit(),
      },
    ];
  }
}
