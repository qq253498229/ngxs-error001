import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SystemAction } from './system.action';
import { Clipboard } from '@angular/cdk/clipboard';
import { CronAction } from '../cron';

export interface SystemStateModel {
  /**
   * 临时数据
   */
  tempData?: any;
  currentTime?: number;
}

@State<SystemStateModel>({
  name: 'system',
  defaults: {},
})
@Injectable({
  providedIn: 'root',
})
export class SystemState {

  constructor(
      private clipboard: Clipboard,
  ) {
  }

  @Action(SystemAction.SaveTempData)
  saveTempData(ctx: StateContext<SystemStateModel>, {data}: SystemAction.SaveTempData) {
    ctx.patchState({tempData: data});
  }

  @Action(SystemAction.Copy)
  copyText(ctx: StateContext<SystemStateModel>, data: SystemAction.Copy) {
    this.clipboard.copy(data.text);
  }

  @Action(SystemAction.ResetConfig)
  ResetConfig(ctx: StateContext<SystemStateModel>) {
    ctx.patchState({tempData: undefined});
    return ctx.dispatch([
      new CronAction.ResetConfig(),
    ]);
  }

  @Action(SystemAction.UpdateSystemTime)
  UpdateSystemTime(ctx: StateContext<SystemStateModel>, {data}: SystemAction.UpdateSystemTime) {
    ctx.patchState({currentTime: data});
  }
}
