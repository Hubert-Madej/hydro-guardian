import { AssetDevice } from '../../asset-device-list/models/asset-device.model';

export interface AssetReport {
  chartDataset: { phVal: [string, number][] };
  assetDevice: AssetDevice;
}
