import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetDeviceRepository } from '../repositories/asset-device.repository';
import { PageOptionsDto } from '../models/dto/page.options.dto';
import { PageDto } from '../models/dto/page.dto';
import { AssetDevice } from '../entities/asset-device.entity';
import { PageMetadataDto } from '../models/dto/page-metadata.dto';
import { CreateAssetDeviceDto } from '../models/dto/create-asset-device.dto';
import { DataSource } from 'typeorm';
import { ExceptionMessages } from '../models/enums/exception-messages.enum';
import { AuthUser } from '../models/interfaces/auth-user.interface';
import { AssetDeviceFactory } from '../factories/asset-device.factory';

@Injectable()
export class AssetDeviceService {
  constructor(
    private readonly _assetDeviceRepository: AssetDeviceRepository,
    private readonly dataSource: DataSource,
    private readonly assetDeviceFactory: AssetDeviceFactory,
  ) {}

  public async findAll(
    pageOptionsDto: PageOptionsDto,
    user: AuthUser,
  ): Promise<PageDto<AssetDevice>> {
    const queryBuilder =
      this._assetDeviceRepository.createQueryBuilder('assetDevice');

    queryBuilder
      .orderBy('assetDevice.dateOfRegistration', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    queryBuilder.andWhere('assetDevice.createdByUuid = :userUuid', {
      userUuid: user.uuid,
    });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetadataDto = new PageMetadataDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetadataDto);
  }

  public async create(
    createAssetDevice: CreateAssetDeviceDto,
    user: AuthUser,
  ): Promise<Pick<CreateAssetDeviceDto, 'tag'>> {
    const assetDevice = this.assetDeviceFactory.create(createAssetDevice, user);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(assetDevice);
      await queryRunner.commitTransaction();

      return { tag: assetDevice.tag };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  public async findOne(uuid: string) {
    return this._assetDeviceRepository.findOneByOrFail({ uuid }).catch(() => {
      throw new NotFoundException(ExceptionMessages.ASSET_DEVICE_NOT_FOUND);
    });
  }

  public async delete(uuid: string): Promise<Pick<AssetDevice, 'uuid'>> {
    await this._assetDeviceRepository.exist({ where: { uuid } }).catch(() => {
      throw new NotFoundException(ExceptionMessages.ASSET_DEVICE_NOT_FOUND);
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(AssetDevice, { where: { uuid } });
      await queryRunner.commitTransaction();

      return { uuid };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAssetDeviceByUuid(uuid: string) {
    return await this._assetDeviceRepository
      .findOneByOrFail({ uuid })
      .catch(() => {
        throw new NotFoundException(ExceptionMessages.ASSET_DEVICE_NOT_FOUND);
      });
  }
}
