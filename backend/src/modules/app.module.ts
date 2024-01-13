import {Module} from '@nestjs/common';
import {AuthModule} from './auth.module';
import {ConfigModule} from '@nestjs/config';
import {CacheModule} from '@nestjs/cache-manager';
import {DataIngestionModule} from './data-ingestion.module';
import {DatabaseModule} from './database.module';
import * as redisStore from 'cache-manager-redis-store';
import * as process from 'process';
import {AssetDeviceModule} from './asset-device.module';
import {ReportModule} from "./report.module";

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot(),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            auth_pass: process.env.REDIS_PASSWORD,
        }),
        DataIngestionModule,
        DatabaseModule,
        AssetDeviceModule,
        ReportModule
    ],
})
export class AppModule {
}
