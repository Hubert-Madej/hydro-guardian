import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MainDataIngestionController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @MessagePattern('hydro-guardian/data_ingestion/water_quality')
  async getNotifications(
    @Payload() data: number[],
    @Ctx() context: MqttContext,
  ) {
    await this.amqpConnection.publish(
      'hg_data_ingestion',
      'hg_data_route',
      data,
    );
  }
}
