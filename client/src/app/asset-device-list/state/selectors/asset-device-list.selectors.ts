import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetDeviceState } from '../reducers/asset-device-list.reducers';
import { StateKey } from 'src/app/shared/enums/state-key.enum';

const selectAssetDeviceState = createFeatureSelector<AssetDeviceState>(StateKey.AssetDevice);

export const selectAssetDevices = createSelector(selectAssetDeviceState, (state) => state.assetDevicesList);
