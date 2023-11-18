import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';
import { TimeSeriesPoint } from '../models/interfaces/time-series-point.interface';

@Injectable()
export class InfluxService {
  influxClient: InfluxDB;

  constructor(private configService: ConfigService) {
    this.influxClient = this.createInfluxClient();
  }

  async insertPoint(timeSeriesPoint: TimeSeriesPoint): Promise<void> {
    const fluxWriter = this.getFluxWriter();

    let point = new Point(timeSeriesPoint.measurementName)
      .tag(
        'machine_tag',
        `${timeSeriesPoint.tagName}\\${timeSeriesPoint.tagValue}`,
      )
      .timestamp(timeSeriesPoint.timestamp);

    for (const fieldKey of Object.keys(timeSeriesPoint.fields)) {
      // Currently use only fields with float values.
      if (this.isFloat(timeSeriesPoint.fields[fieldKey])) {
        point.floatField('_value', +timeSeriesPoint.fields[fieldKey]);
      }
    }

    try {
      fluxWriter.writePoint(point);
      await fluxWriter.flush();
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed to write point to influx.',
        {
          cause: err,
        },
      );
    }
  }

  getFluxQuery(): QueryApi {
    const organizationTag = this.configService.get('INFLUX_ORGANIZATION_NAME');

    return this.influxClient.getQueryApi(organizationTag);
  }

  private getFluxWriter(): WriteApi {
    const organizationTag = this.configService.get('INFLUX_ORGANIZATION_NAME');
    const fluxBucket = this.configService.get('INFLUX_BUCKET_NAME');

    return this.createInfluxClient().getWriteApi(
      organizationTag,
      fluxBucket,
      'ms',
      {
        batchSize: 1000,
        flushInterval: 1000,
        maxBufferLines: 100_000,
      },
    );
  }

  private createInfluxClient(): InfluxDB {
    const url = this.configService.get('INFLUX_URL');
    const token = this.configService.get('INFLUX_TOKEN');

    return new InfluxDB({ url, token });
  }

  private isFloat(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}
