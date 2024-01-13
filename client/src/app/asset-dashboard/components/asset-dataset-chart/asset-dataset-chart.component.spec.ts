import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDatasetChartComponent } from './asset-dataset-chart.component';

describe('AssetDatasetChartComponent', () => {
  let component: AssetDatasetChartComponent;
  let fixture: ComponentFixture<AssetDatasetChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetDatasetChartComponent],
    });
    fixture = TestBed.createComponent(AssetDatasetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
