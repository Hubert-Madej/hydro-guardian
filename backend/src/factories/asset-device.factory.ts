import { Injectable } from '@nestjs/common';
import { AssetDeviceRepository } from '../repositories/asset-device.repository';
import { CreateAssetDeviceDto } from '../models/dto/create-asset-device.dto';
import { AssetDevice } from '../entities/asset-device.entity';
import { AuthUser } from '../models/interfaces/auth-user.interface';

@Injectable()
export class AssetDeviceFactory {
  constructor(private readonly _assetDeviceRepository: AssetDeviceRepository) {}

  create(
    createAssetDeviceDto: CreateAssetDeviceDto,
    user: AuthUser,
  ): AssetDevice {
    const assetDevice = this._assetDeviceRepository.create();
    assetDevice.tag = createAssetDeviceDto.tag;
    assetDevice.createdByUuid = user.uuid;
    assetDevice.name = createAssetDeviceDto.name;
    assetDevice.latitude = createAssetDeviceDto.latitude;
    assetDevice.longitude = createAssetDeviceDto.longitude;
    assetDevice.report = createAssetDeviceDto.report;

    return assetDevice;
  }
}
