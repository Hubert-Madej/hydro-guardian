import { Component, OnInit } from '@angular/core';
import { AssetDeviceListService } from './services/asset-device-list.service';

@Component({
  selector: 'app-asset-device-list',
  templateUrl: './asset-device-list.component.html',
  styleUrls: ['./asset-device-list.component.scss'],
})
export class AssetDeviceListComponent implements OnInit {
  assetDevices$ = this.assetDeviceListService.selectAssetDeviceList();

  constructor(private readonly assetDeviceListService: AssetDeviceListService) {}

  ngOnInit(): void {
    this.getAssetDeviceList();
  }

  getAssetDeviceList(page = 1): void {
    this.assetDeviceListService.loadAssetDevices(page);
  }
}
