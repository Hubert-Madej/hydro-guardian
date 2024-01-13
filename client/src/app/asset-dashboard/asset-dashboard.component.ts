import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetReportService } from './services/asset-report.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asset-dashboard',
  templateUrl: './asset-dashboard.component.html',
  styleUrls: ['./asset-dashboard.component.scss'],
})
export class AssetDashboardComponent implements OnInit, OnDestroy {
  eligibleAssets$ = this.assetReportService.selectEligibleAssets();
  assetReport$ = this.assetReportService.selectAssetReportData();

  selectedAsset = new FormControl('');

  subscription = new Subscription();

  constructor(private readonly assetReportService: AssetReportService) {}

  ngOnInit() {
    this.assetReportService.loadEligibleAssets();

    this.subscription.add(
      this.selectedAsset.valueChanges.subscribe((val) => this.assetReportService.loadAssetReportData(val)),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
