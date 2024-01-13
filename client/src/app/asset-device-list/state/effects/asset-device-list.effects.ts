import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { assetDeviceListActions } from '../actions/asset-device-list.actions';
import { map, switchMap } from 'rxjs';
import { AssetDeviceListApiService } from '../../services/asset-device-list-api.service';
import { PaginationDetails } from 'src/app/shared/models/pagination.model';
import { AssetDevice } from '../../models/asset-device.model';

@Injectable({
  providedIn: 'root',
})
export class AssetDeviceListEffects {
  loadAssetDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assetDeviceListActions.loadAssetDevicesList),
      switchMap((action) =>
        this.assetDeviceApiService.loadAssetDevicesList(action.page).pipe(
          map((paginatedAssetDevices: PaginationDetails<AssetDevice>) => {
            return assetDeviceListActions.loadAssetDevicesListSuccess({ assetDevicesList: paginatedAssetDevices });
          }),
        ),
      ),
    );
  });

  loadAssetDevice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assetDeviceListActions.loadAssetDeviceDetails),
      switchMap((action) =>
        this.assetDeviceApiService.loadAssetDevice(action.uuid).pipe(
          map((assetDeviceDetails: AssetDevice) => {
            return assetDeviceListActions.loadAssetDeviceDetailsSuccess({ assetDeviceDetails });
          }),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly assetDeviceApiService: AssetDeviceListApiService,
  ) {}
}
