import { CronState, CronStateModel } from './cron.state';
import { Selector } from '@ngxs/store';

export class CronSelector {
  @Selector([CronState])
  static list({cronMap}: CronStateModel) {
    return [];
  }
}
