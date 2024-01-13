import { AssetReport } from '../../models/asset-report.model';
import { createReducer, on } from '@ngrx/store';
import { assetReportActions } from '../actions/asset-report.actions';
import { AssetDevice } from '../../../asset-device-list/models/asset-device.model';

export interface AssetReportState {
  assetReport: AssetReport;
  eligibleAssets: AssetDevice[];
}

const initialState: AssetReportState = {
  assetReport: null,
  eligibleAssets: null,
};

export const assetReportReducer = createReducer(
  initialState,
  on(assetReportActions.loadAssetDeviceReportSuccess, (state, action): AssetReportState => {
    return { ...state, assetReport: action.assetReport };
  }),
  on(assetReportActions.loadAssetsEligibleForReportSuccess, (state, action): AssetReportState => {
    return { ...state, eligibleAssets: action.assetDevices };
  }),
);
