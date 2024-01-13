import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AssetReport } from '../models/asset-report.model';
import { selectAssetReport, selectEligibleAssets } from '../state/selectors/asset-report.selectors';
import { assetReportActions } from '../state/actions/asset-report.actions';
import { AssetDevice } from '../../asset-device-list/models/asset-device.model';

@Injectable({
  providedIn: 'root',
})
export class AssetReportService {
  constructor(private readonly store: Store) {}

  selectAssetReportData(): Observable<AssetReport> {
    return this.store.select(selectAssetReport);
  }

  selectEligibleAssets(): Observable<AssetDevice[]> {
    return this.store.select(selectEligibleAssets);
  }

  loadEligibleAssets(): void {
    this.store.dispatch(assetReportActions.loadAssetsEligibleForReport());
  }

  loadAssetReportData(uuid: string): void {
    this.store.dispatch(assetReportActions.loadAssetDeviceReport({ uuid }));
  }
}
