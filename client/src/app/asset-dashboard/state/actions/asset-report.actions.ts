import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AssetReport } from '../../models/asset-report.model';
import { AssetDevice } from '../../../asset-device-list/models/asset-device.model';

export const assetReportActions = createActionGroup({
  source: 'Asset Device Report API',
  events: {
    'Load Assets Eligible For Report': emptyProps(),
    'Load Assets Eligible For Report Success': props<{ assetDevices: AssetDevice[] }>(),
    'Load Asset Device Report': props<{ uuid: string }>(),
    'Load Asset Device Report Success': props<{ assetReport: AssetReport }>(),
  },
});
