import { NestFactory } from '@nestjs/core';
import { MainDataIngestionModule } from './main-data-ingestion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MainDataIngestionModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${configService.get('MQTT_HOST')}:${configService.get(
        'MQTT_PORT',
      )}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
