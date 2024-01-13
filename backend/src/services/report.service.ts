import {Injectable, NotFoundException} from '@nestjs/common';
import {InfluxService} from './influx.service';
import {AssetDeviceService} from './asset-device.service';
import {AuthUser} from '../models/interfaces/auth-user.interface';
import {AssetDeviceRepository} from '../repositories/asset-device.repository';

@Injectable()
export class ReportService {
    constructor(
        private readonly influxService: InfluxService,
        private readonly assetDeviceService: AssetDeviceService,
        private readonly _assetDeviceRepository: AssetDeviceRepository,
    ) {
    }

    public async getAssetsEligibleForReport(user: AuthUser) {
        console.log(user)
        return this._assetDeviceRepository
            .createQueryBuilder('assetDevice')
            .where('assetDevice.createdByUuid = :userUuid', {
                userUuid: user.uuid,
            })
            .getMany();
    }

    public async getReport(uuid: string) {
        try {
            const assetDevice =
                await this.assetDeviceService.getAssetDeviceByUuid(uuid);

            const query = `
            import "date"
            from(bucket: "hg-data")
                |> range(start: date.sub(d: 24h, from: now()), stop: now())
                |> filter(fn: (r) => r["_measurement"] == "water_quality")
                |> filter(fn: (r) => r["_field"] == "phVal")
                |> filter(fn: (r) => r["machine_tag"] == "${assetDevice.tag}")
                |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
                |> yield(name: "mean")
        `;

            const data = await this.executeQuery(query);

            return {
                chartDataset: data,
                assetDevice,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error(
                'An unexpected error occurred while fetching dashboard details.',
            );
        }
    }

    private async executeQuery(query: string) {
        const data = {};
        const queryApi = this.influxService.getFluxQuery();

        for await (const {values, tableMeta} of queryApi.iterateRows(query)) {
            const o = tableMeta.toObject(values);
            const result = data[o._field] ?? [];
            result.push(o._time ? [o._time, o._value] : o._value);
            data[o._field] = result;
        }

        return data;
    }
}
