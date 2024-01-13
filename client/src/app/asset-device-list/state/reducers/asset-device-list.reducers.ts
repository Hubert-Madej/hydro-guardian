import { createReducer, on } from '@ngrx/store';
import { AssetDevice } from '../../models/asset-device.model';
import { assetDeviceListActions } from '../actions/asset-device-list.actions';
import { initialPaginationState, PaginationDetails } from 'src/app/shared/models/pagination.model';

export interface AssetDeviceState {
  assetDevicesList: PaginationDetails<AssetDevice>;
  assetDeviceDetails: AssetDevice;
}

const initialState: AssetDeviceState = {
  assetDevicesList: initialPaginationState,
  assetDeviceDetails: null,
};

export const assetDeviceReducer = createReducer(
  initialState,
  on(assetDeviceListActions.loadAssetDevicesListSuccess, (state, action): AssetDeviceState => {
    return { ...state, assetDevicesList: action.assetDevicesList };
  }),
  on(assetDeviceListActions.loadAssetDeviceDetailsSuccess, (state, action): AssetDeviceState => {
    return { ...state, assetDeviceDetails: action.assetDeviceDetails };
  }),
);
