import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPaginationComponent } from './components/list-pagination/list-pagination.component';
import { AppMapComponent } from './components/app-map/app-map.component';
import { AppChartComponent } from './components/app-chart/app-chart.component';
import { NgxEchartsDirective } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [ListPaginationComponent, AppMapComponent, AppChartComponent],
  imports: [CommonModule, NgxEchartsDirective, LeafletModule],
  exports: [ListPaginationComponent, AppChartComponent, AppMapComponent],
})
export class SharedModule {}
