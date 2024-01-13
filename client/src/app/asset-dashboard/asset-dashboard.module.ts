import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetDashboardComponent } from './asset-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { StateKey } from '../shared/enums/state-key.enum';
import { assetReportReducer } from './state/reducers/asset-report.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AssetReportEffects } from './state/effects/asset-report.effects';
import { AssetDashboardRoutingModule } from './asset-dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetDatasetChartComponent } from './components/asset-dataset-chart/asset-dataset-chart.component';
import { provideEcharts } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AssetDashboardComponent, AssetDatasetChartComponent],
  imports: [
    CommonModule,
    AssetDashboardRoutingModule,
    StoreModule.forFeature(StateKey.AssetReport, assetReportReducer),
    EffectsModule.forFeature([AssetReportEffects]),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [provideEcharts()],
})
export class AssetDashboardModule {}
