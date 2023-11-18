import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { DataIngestionService } from '../services/data-ingestion.service';
import { CommonModule } from './common.module';
import * as process from 'process';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    CommonModule,
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
  ],
  providers: [DataIngestionService],
})
export class DataIngestionModule {}
