import { Component, OnInit } from '@angular/core';
import { CoreFacade } from './core/services/core.facade';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hydro Guardian';
  authUser$ = this.authService.getAuthUser();

  constructor(
    private readonly coreFacade: CoreFacade,
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.coreFacade.startLoadingSpinner();
    this.authService.autoLogin();
  }
}
