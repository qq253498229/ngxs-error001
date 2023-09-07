import { CronState, CronStateModel } from './cron.state';
import { Selector } from '@ngxs/store';
import * as _ from 'lodash';

export class CronSelector {
  @Selector([CronState])
  static list({cronMap}: CronStateModel) {
    return _.map(cronMap, v => v);
  }

  @Selector([CronState])
  static cronDrawerFlag({cronDrawerFlag}: CronStateModel) {
    return cronDrawerFlag;
  }
}
