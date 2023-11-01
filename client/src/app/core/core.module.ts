import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [HeaderContainerComponent, HeaderComponent, DashboardContainerComponent, DashboardComponent],
  imports: [CommonModule, MenubarModule],
  exports: [HeaderContainerComponent],
})
export class CoreModule {}
