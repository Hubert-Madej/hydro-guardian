import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DataIngestionService {
  @RabbitRPC({
    exchange: 'hg_data_ingestion',
    routingKey: 'hg_data_route',
    queue: 'hg_data_route_queue',
  })
  public async sensorDataSourceHandler(payload: any) {
    // @TODO Insert data into influx
    console.log(payload);
  }
}
