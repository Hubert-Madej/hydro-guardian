import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetDevice } from './asset-device.entity';

@Entity({ name: 'resource-groups' })
export class ResourceGroup {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'created_by', type: 'text' })
  createdBy: string;

  @OneToMany(() => AssetDevice, (assetDevice) => assetDevice.resourceGroup)
  assetDevice: AssetDevice[];
}
