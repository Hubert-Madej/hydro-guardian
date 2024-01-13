import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetDeviceListComponent } from './asset-device-list.component';
import { StoreModule } from '@ngrx/store';
import { StateKey } from '../shared/enums/state-key.enum';
import { assetDeviceReducer } from './state/reducers/asset-device-list.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AssetDeviceListEffects } from './state/effects/asset-device-list.effects';
import { AssetDeviceListRoutingModule } from './asset-device-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AssetDeviceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    AssetDeviceListRoutingModule,
    StoreModule.forFeature(StateKey.AssetDevice, assetDeviceReducer),
    EffectsModule.forFeature([AssetDeviceListEffects]),
  ],
})
export class AssetDeviceListModule {}
