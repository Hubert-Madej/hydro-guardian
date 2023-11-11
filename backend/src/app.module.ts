import {Module} from '@nestjs/common';
import {AuthModule} from './modules/auth.module';
import {ConfigModule} from '@nestjs/config';
import {CacheModule} from '@nestjs/cache-manager';
import {DataIngestionModule} from './modules/data-ingestion.module';
import {DataIngestionService} from './services/data-ingestion.service';
import * as redisStore from 'cache-manager-redis-store';
import * as process from 'process';

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
    ],
    providers: [
        DataIngestionService
    ],
})
export class AppModule {
}
