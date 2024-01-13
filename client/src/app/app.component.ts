import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFacade } from './core/services/core.facade';
import { AuthService } from './auth/services/auth.service';
import { AuthUser } from './auth/models/auth-user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Hydro Guardian';
  authUser: AuthUser = null;
  sub = new Subscription();

  constructor(
    private readonly coreFacade: CoreFacade,
    private readonly authService: AuthService,
  ) {
    this.authService.autoLogin();
  }

  ngOnInit() {
    this.coreFacade.startLoadingSpinner();

    this.sub.add(
      this.authService.getAuthUser().subscribe((authUser) => {
        this.authUser = authUser;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
