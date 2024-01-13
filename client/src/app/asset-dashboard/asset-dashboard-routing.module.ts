import { RouterModule, Routes } from '@angular/router';
import { AssetDashboardComponent } from './asset-dashboard.component';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AssetDashboardComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDashboardRoutingModule {}
