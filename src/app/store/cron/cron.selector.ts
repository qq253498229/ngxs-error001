import { Selector } from '@ngxs/store';
import { CronState, CronStateModel } from '.';

export class CronSelector {
  @Selector([CronState])
  static id({id}: CronStateModel) {
    return id;
  }
}
