import {Module} from '@nestjs/common';
import {ReportService} from '../services/report.service';
import {AssetDeviceModule} from './asset-device.module';
import {ReportController} from "../controllers/report.controller";
import {CommonModule} from "./common.module";

@Module({
    controllers: [ReportController],
    imports: [AssetDeviceModule, CommonModule],
    providers: [ReportService],
})
export class ReportModule {
}
