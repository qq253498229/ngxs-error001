import { Selector } from '@ngxs/store';
import { CronState, CronStateModel } from './cron.state';
import { SystemState, SystemStateModel } from '../system';

export class CronSelector {
  // @Selector([CronState])
  // static list({cronMap}: CronStateModel) {
  //   console.log('list', cronMap);
  //   return [];
  // }
  /**
   * fixme
   * polyfills.js:1 [webpack-dev-server] Server started: Hot Module Replacement disabled, Live Reloading enabled, Progress disabled, Overlay enabled.
   * custom-router-state-serializer.ts:27 Uncaught TypeError: Cannot read properties of undefined (reading 'SystemState')
   *     at Module.SystemState (custom-router-state-serializer.ts:27:3)
   *     at 4939 (cron.selector.ts:14:25)
   *     at __webpack_require__ (bootstrap:19:1)
   *     at 4046 (cron.state.ts:134:2)
   *     at __webpack_require__ (bootstrap:19:1)
   *     at 4646 (system.selector.ts:14:4)
   *     at __webpack_require__ (bootstrap:19:1)
   *     at 4345 (custom-router-state-serializer.ts:27:3)
   *     at __webpack_require__ (bootstrap:19:1)
   *     at 6738 (index.ts:2:30)
   * SystemState @ custom-router-state-serializer.ts:27
   * 4939 @ cron.selector.ts:14
   * __webpack_require__ @ bootstrap:19
   * 4046 @ cron.state.ts:134
   * __webpack_require__ @ bootstrap:19
   * 4646 @ system.selector.ts:14
   * __webpack_require__ @ bootstrap:19
   * 4345 @ custom-router-state-serializer.ts:27
   * __webpack_require__ @ bootstrap:19
   * 6738 @ index.ts:2
   * __webpack_require__ @ bootstrap:19
   * 6401 @ app-routing.module.ts:12
   * __webpack_require__ @ bootstrap:19
   * 8629 @ app.component.html:48
   * __webpack_require__ @ bootstrap:19
   * 4913 @ environment.development.ts:3
   * __webpack_require__ @ bootstrap:19
   * __webpack_exec__ @ lib|fs:1
   * (anonymous) @ lib|fs:1
   * __webpack_require__.O @ chunk loaded:23
   * (anonymous) @ lib|fs:1
   * webpackJsonpCallback @ jsonp chunk loading:71
   * (anonymous) @ main.js:1
   * Show 13 more frames
   * Show less
   * */
  @Selector([CronState, SystemState])
  static list(cron: CronStateModel, system: SystemStateModel) {
    console.log('list', cron, system);
    return [];
  }

  // @Selector([CronSelector.cronMap, SystemSelector.currentTime])
  // static list(cronMap: any, currentTime?: number) {
  //   console.log('list', cronMap, currentTime);
  //   return [];
  // }

  // @Selector([CronState])
  // static cronMap({cronMap}: CronStateModel) {
  //   console.log('cronMap', cronMap);
  //   return cronMap;
  // }


  // @Selector([CronSelector.listMap, SystemSelector.currentTime])
  // static list(list: any[], currentTime: number) {
  //   console.log('list', list, currentTime);
  //   return list;
  // let options = {currentDate: new Date(currentTime)};
  // return _.map(cronMap, v => {
  // console.log('map0', v);
  // let parser = cron.parseExpression(v.cron, options);
  // let newV = immutable.set(v, ['nextTime'], []);
  // for (let i = 0; i < 5; i++) {
  //   newV = immutable.insert(newV, ['nextTime'], parser.next().toDate().getTime());
  // }
  // console.log('map9', newV);
  // return v;
  // });
  // }

  // @Selector([CronState])
  // static list({cronMap}: CronStateModel) {
  //   return _.map(cronMap, v => v);
  // }

  @Selector([CronState])
  static cronDrawerFlag({cronDrawerFlag}: CronStateModel) {
    return cronDrawerFlag;
  }
}
