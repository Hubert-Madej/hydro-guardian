import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './auth/containers/login-container/login-container.component';
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { DashboardContainerComponent } from './core/containers/dashboard-container/dashboard-container.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginContainerComponent,
    canActivate: [UnauthenticatedGuard],
  },
  {
    path: '',
    component: DashboardContainerComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
