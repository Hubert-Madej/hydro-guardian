import { NestFactory } from '@nestjs/core';
import { MainDataIngestionModule } from './main-data-ingestion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MainDataIngestionModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
