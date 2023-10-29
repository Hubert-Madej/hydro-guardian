import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoreFacade } from './core/services/core.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hydro Guardian';

  constructor(private coreFacade: CoreFacade) {}

  ngOnInit() {
    this.coreFacade.startLoadingSpinner();
  }
}
