import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AssetDeviceService } from '../services/asset-device.service';
import { PageOptionsDto } from '../models/dto/page.options.dto';
import { PageDto } from '../models/dto/page.dto';
import { AssetDevice } from '../entities/asset-device.entity';
import { CreateAssetDeviceDto } from '../models/dto/create-asset-device.dto';
import { User } from '../decorators/user.decorator';
import { AuthUser } from '../models/interfaces/auth-user.interface';

@Controller('asset-devices')
@UseInterceptors(ClassSerializerInterceptor)
export class AssetDeviceController {
  constructor(private readonly _assetDeviceService: AssetDeviceService) {}

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @User() user: AuthUser,
  ): Promise<PageDto<AssetDevice>> {
    return this._assetDeviceService.findAll(pageOptionsDto, user);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return this._assetDeviceService.findOne(uuid);
  }

  @Post()
  async create(
    @Body() createAssetDeviceDto: CreateAssetDeviceDto,
    @User() user: AuthUser,
  ): Promise<Pick<CreateAssetDeviceDto, 'tag'>> {
    return this._assetDeviceService.create(createAssetDeviceDto, user);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return this._assetDeviceService.delete(uuid);
  }
}
