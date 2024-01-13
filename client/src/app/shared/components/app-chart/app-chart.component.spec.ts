import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartComponent } from './app-chart.component';

describe('AppChartComponent', () => {
  let component: AppChartComponent;
  let fixture: ComponentFixture<AppChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppChartComponent],
    });
    fixture = TestBed.createComponent(AppChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
