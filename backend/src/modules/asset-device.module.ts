import { Module } from '@nestjs/common';
import { AssetDeviceController } from '../controllers/asset-device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetDevice } from '../entities/asset-device.entity';
import { AssetDeviceService } from '../services/asset-device.service';
import { AssetDeviceRepository } from '../repositories/asset-device.repository';
import { CommonModule } from './common.module';
import { AssetDeviceFactory } from '../factories/asset-device.factory';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDevice]), CommonModule],
  providers: [AssetDeviceService, AssetDeviceRepository, AssetDeviceFactory],
  controllers: [AssetDeviceController],
  exports: [AssetDeviceService, AssetDeviceRepository],
})
export class AssetDeviceModule {}
