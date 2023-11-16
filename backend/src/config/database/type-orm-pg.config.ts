import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const typeOrmPgConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: false,
  entities: [path.join(__dirname, '../entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*.{.ts,.js}')],
  seeds: [],
};

export default new DataSource(typeOrmPgConfig);
