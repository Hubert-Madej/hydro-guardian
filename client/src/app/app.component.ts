import { Component, OnInit } from '@angular/core';
import { CoreFacade } from './core/services/core.facade';
import { AuthFacade } from './auth/services/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hydro Guardian';
  authUser$ = this.authFacade.selectAuthUser$();

  constructor(
    private coreFacade: CoreFacade,
    private readonly authFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.coreFacade.startLoadingSpinner();
  }
}
