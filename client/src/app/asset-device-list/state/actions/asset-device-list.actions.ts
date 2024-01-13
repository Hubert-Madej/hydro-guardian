import { createActionGroup, props } from '@ngrx/store';
import { AssetDevice } from '../../models/asset-device.model';
import { PaginationDetails } from 'src/app/shared/models/pagination.model';

export const assetDeviceListActions = createActionGroup({
  source: 'Asset Device API',
  events: {
    'Load Asset Devices List': props<{ page: number }>(),
    'Load Asset Devices List Success': props<{ assetDevicesList: PaginationDetails<AssetDevice> }>(),
    'Load Asset Device Details': props<{ uuid: string }>(),
    'Load Asset Device Details Success': props<{ assetDeviceDetails: AssetDevice }>(),
  },
});
