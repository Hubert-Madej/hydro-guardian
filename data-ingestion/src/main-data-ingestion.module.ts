import { Module } from '@nestjs/common';
import { MainDataIngestionController } from './main-data-ingestion.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'hg_data_ingestion',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
    ClientsModule.register([
      {
        name: 'HYDRO_GUARDIAN_MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
  ],
  controllers: [MainDataIngestionController],
})
export class MainDataIngestionModule {}
