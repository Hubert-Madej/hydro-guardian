import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-devices',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'asset-devices',
    loadChildren: () => import('./asset-device-list/asset-device-list.module').then((m) => m.AssetDeviceListModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./asset-dashboard/asset-dashboard.module').then((m) => m.AssetDashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
