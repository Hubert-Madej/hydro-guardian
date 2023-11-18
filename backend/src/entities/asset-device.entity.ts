import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AssetDevice {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  tag: string;

  @CreateDateColumn({ name: 'date_of_registration', nullable: false })
  dateOfRegistration: Date;
}
