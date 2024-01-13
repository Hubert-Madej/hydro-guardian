import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AssetReportApiService} from '../../services/asset-report.api.service';
import {assetReportActions} from '../actions/asset-report.actions';
import {map, switchMap} from 'rxjs';
import {AssetReport} from '../../models/asset-report.model';
import {AssetDevice} from '../../../asset-device-list/models/asset-device.model';

@Injectable({
  providedIn: 'root',
})
export class AssetReportEffects {
  loadAssetsEligibleForReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assetReportActions.loadAssetsEligibleForReport),
      switchMap(() =>
        this.assetReportApiService.loadAssetsEligibleForReport().pipe(
          map((assetDevices: AssetDevice[]) => {
            return assetReportActions.loadAssetsEligibleForReportSuccess({assetDevices});
          }),
        ),
      ),
    );
  });

  loadAssetReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assetReportActions.loadAssetDeviceReport),
      switchMap((action) =>
        this.assetReportApiService.loadAssetReport(action.uuid).pipe(
          map((assetReport: AssetReport) => {
            return assetReportActions.loadAssetDeviceReportSuccess({assetReport});
          }),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly assetReportApiService: AssetReportApiService,
  ) {
  }
}
