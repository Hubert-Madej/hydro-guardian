import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onSignOut = new EventEmitter<void>();

  items: MenuItem[] | undefined;

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
        command: () => this.onSignOut.emit(),
      },
    ];
  }
}
