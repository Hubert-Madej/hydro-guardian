import {Controller, Get, Param} from '@nestjs/common';
import {ReportService} from '../services/report.service';
import {User} from '../decorators/user.decorator';
import {AuthUser} from '../models/interfaces/auth-user.interface';

@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get('asset/eligible-assets')
    async getAssetsEligibleForReport(@User() user: AuthUser) {
        return this.reportService.getAssetsEligibleForReport(user);
    }

    @Get('asset/:uuid')
    getAssetReport(@Param('uuid') uuid: string) {
        return this.reportService.getReport(uuid);
    }
}
