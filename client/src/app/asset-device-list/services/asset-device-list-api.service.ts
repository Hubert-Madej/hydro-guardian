import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssetDevice } from '../models/asset-device.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationDetails } from 'src/app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class AssetDeviceListApiService {
  private readonly apiUrl = environment.apiUrl + '/asset-devices';

  constructor(private readonly httpClient: HttpClient) {}

  loadAssetDevicesList(page: number): Observable<PaginationDetails<AssetDevice>> {
    const options = {
      params: new HttpParams().set('page', page),
    };

    return this.httpClient.get<PaginationDetails<AssetDevice>>(this.apiUrl, options);
  }

  loadAssetDevice(uuid: string): Observable<AssetDevice> {
    return this.httpClient.get<AssetDevice>(`${this.apiUrl}/${uuid}`);
  }
}
