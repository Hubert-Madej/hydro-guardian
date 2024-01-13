import { IsBoolean, IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateAssetDeviceDto {
  @IsString()
  name: string;

  @IsString()
  tag: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsBoolean()
  report: boolean;
}
