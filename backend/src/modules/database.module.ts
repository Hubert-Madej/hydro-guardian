import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: false,
        entities: [path.join(__dirname, '../entities/*.entity{.ts,.js}')],
        migrations: [path.join(__dirname, '../migrations/*.{.ts,.js}')],
        cli: {
          migrationsDir: [__dirname + '../migrations/**/*.ts'],
        },
        useTransaction: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
