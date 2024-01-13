import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetReport } from '../../models/asset-report.model';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-asset-dataset-chart',
  templateUrl: './asset-dataset-chart.component.html',
  styleUrls: ['./asset-dataset-chart.component.scss'],
})
export class AssetDatasetChartComponent implements OnChanges, OnInit {
  @Input() assetReport: AssetReport;
  chartOption: EChartsOption;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.assetReport) {
      const xAxis = this.assetReport.chartDataset.phVal.map((series) => series[0]);
      const yAxis = this.assetReport.chartDataset.phVal.map((series) => series[1]);

      this.chartOption = {
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            // @ts-ignore
            return `<b>${params['name']}</b> : ${Math.round(params['value'] * 100) / 100} pH`;
          },
        },
        series: [
          {
            data: yAxis,
            color: '#44bba4',
            type: 'line',
          },
        ],
      };
    }
  }
}
