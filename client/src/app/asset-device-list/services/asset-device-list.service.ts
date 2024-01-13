import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { assetDeviceListActions } from '../state/actions/asset-device-list.actions';
import { Observable } from 'rxjs';
import { PaginationDetails } from 'src/app/shared/models/pagination.model';
import { AssetDevice } from '../models/asset-device.model';
import { selectAssetDevices } from '../state/selectors/asset-device-list.selectors';

@Injectable({
  providedIn: 'root',
})
export class AssetDeviceListService {
  constructor(private readonly store: Store) {}

  selectAssetDeviceList(): Observable<PaginationDetails<AssetDevice>> {
    return this.store.select(selectAssetDevices);
  }

  loadAssetDevices(page: number): void {
    this.store.dispatch(assetDeviceListActions.loadAssetDevicesList({ page }));
  }
}
