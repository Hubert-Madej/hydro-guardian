import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetReport } from '../models/asset-report.model';
import { AssetDevice } from '../../asset-device-list/models/asset-device.model';

@Injectable({
  providedIn: 'root',
})
export class AssetReportApiService {
  private readonly apiUrl = environment.apiUrl + '/reports/asset';

  constructor(private readonly httpClient: HttpClient) {}

  loadAssetsEligibleForReport(): Observable<AssetDevice[]> {
    return this.httpClient.get<AssetDevice[]>(`${this.apiUrl}/eligible-assets`);
  }

  loadAssetReport(uuid: string): Observable<AssetReport> {
    return this.httpClient.get<AssetReport>(`${this.apiUrl}/${uuid}`);
  }
}
