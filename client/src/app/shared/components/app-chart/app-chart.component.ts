import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './app-chart.component.html',
  styleUrls: ['./app-chart.component.scss'],
})
export class AppChartComponent {
  @Input() chartOption: EChartsOption;
}
