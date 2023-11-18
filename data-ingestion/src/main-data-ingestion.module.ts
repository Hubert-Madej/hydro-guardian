import { Module } from '@nestjs/common';
import { MainDataIngestionController } from './main-data-ingestion.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'hg_data_ingestion',
          type: 'topic',
        },
      ],
      uri: `amqp://${process.env.MQ_USERNAME}:${process.env.MQ_PASSWORD}@${process.env.MQ_HOST}:${process.env.MQ_PORT}`,
      connectionInitOptions: { wait: false },
    }),

    ClientsModule.register([
      {
        name: 'HYDRO_GUARDIAN_MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
        },
      },
    ]),
  ],
  controllers: [MainDataIngestionController],
})
export class MainDataIngestionModule {}
