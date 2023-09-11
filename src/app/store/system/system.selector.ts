import { Selector } from '@ngxs/store';
import { SystemState, SystemStateModel } from './system.state';

export class SystemSelector {
  @Selector([SystemState])
  static tempData({tempData}: SystemStateModel) {
    return tempData;
  }

  @Selector([SystemState])
  static currentTime({currentTime}: SystemStateModel) {
    console.log('currentTime');
    return currentTime;
  }
}
