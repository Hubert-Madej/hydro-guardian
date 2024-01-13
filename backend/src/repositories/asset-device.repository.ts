import { Repository, SelectQueryBuilder } from 'typeorm';
import { AssetDevice } from '../entities/asset-device.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class AssetDeviceRepository extends Repository<AssetDevice> {
  constructor(
    @InjectRepository(AssetDevice)
    private readonly assetDeviceRepository: Repository<AssetDevice>,
  ) {
    super(
      assetDeviceRepository.target,
      assetDeviceRepository.manager,
      assetDeviceRepository.queryRunner,
    );
  }

  createQueryBuilder(alias?: string): SelectQueryBuilder<AssetDevice> {
    return super.createQueryBuilder(alias, this.queryRunner);
  }
}
