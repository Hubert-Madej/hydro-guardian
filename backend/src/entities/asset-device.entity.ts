import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResourceGroup } from './resource-group.entity';

@Entity({ name: 'asset-devices' })
export class AssetDevice {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  tag: string;

  @Column({ type: 'double precision', nullable: false })
  latitude: number;

  @Column({ type: 'double precision', nullable: false })
  longitude: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  report: boolean;

  @Column({ name: 'created_by_uuid', type: 'uuid', nullable: false })
  createdByUuid: string;

  @CreateDateColumn({ name: 'date_of_registration', nullable: false })
  dateOfRegistration: Date;

  @ManyToOne(() => AssetDevice, { nullable: true })
  @JoinColumn()
  resourceGroup?: ResourceGroup;
}
