import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { AssetDeviceListComponent } from './asset-device-list.component';

const routes: Routes = [
  {
    path: '',
    component: AssetDeviceListComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDeviceListRoutingModule {}
