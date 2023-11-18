import { Module } from '@nestjs/common';
import { InfluxService } from '../services/influx.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [InfluxService, ConfigService],
  exports: [InfluxService],
})
export class CommonModule {}
