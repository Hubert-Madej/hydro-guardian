import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateKey } from '../../../shared/enums/state-key.enum';
import { AssetReportState } from '../reducers/asset-report.reducers';

const selectAssetReportState = createFeatureSelector<AssetReportState>(StateKey.AssetReport);

export const selectAssetReport = createSelector(selectAssetReportState, (state) => state.assetReport);
export const selectEligibleAssets = createSelector(selectAssetReportState, (state) => state.eligibleAssets);
