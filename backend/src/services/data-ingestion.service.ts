import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { InfluxService } from './influx.service';
import { TimeSeriesPoint } from '../models/interfaces/time-series-point.interface';

@Injectable()
export class DataIngestionService {
  constructor(private readonly influxService: InfluxService) {}

  @RabbitRPC({
    exchange: 'hg_data_ingestion',
    routingKey: 'hg_data_route',
    queue: 'hg_data_route_queue',
  })
  public async sensorDataSourceHandler(timeSeriesPoint: TimeSeriesPoint) {
    await this.influxService.insertPoint(timeSeriesPoint);
  }
}
