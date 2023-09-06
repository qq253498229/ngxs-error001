import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CronAction } from '.';
import * as immutable from 'object-path-immutable';
import { CronService } from '../../shared/cron/cron.service';

export interface CronStateModel {
  cronMap: {
    [key: string]: {
      status: 'start' | 'stop',
      cron: string,
      message: string,
    }
  };
}

@State<CronStateModel>({
  name: 'cron',
  defaults: {
    cronMap: {},
  },
})
@Injectable({
  providedIn: 'root',
})
export class CronState {

  constructor(
      private cronService: CronService,
  ) {
  }

  @Action(CronAction.ResetConfig)
  ResetConfig(ctx: StateContext<CronStateModel>) {
    let state = ctx.getState();
    //开启job，之前开启的在刷新页面之后还要重新开启
    this.cronService.startJob(state.cronMap);
  }

  @Action(CronAction.StartNotification)
  StartNotification(ctx: StateContext<CronStateModel>, {data}: CronAction.StartNotification) {
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'start') return;
    let cronJob = this.cronService.newJob(data.cron, data.message);
    cronJob.start();
    this.cronService.putJob(data.id, cronJob);
    let mapValue = {
      cron: data.cron,
      status: 'start',
      message: data.message,
    };
    let newState = immutable.set(state, ['cronMap', data.id], mapValue);
    ctx.setState(newState);
  }

  @Action(CronAction.StopNotification)
  StopNotification(ctx: StateContext<CronStateModel>, {data}: CronAction.StopNotification) {
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'stop') return;
    let existMap = state.cronMap[data.id];
    let cronJob = this.cronService.getJob(data.id);
    if (!!cronJob) cronJob.stop();
    this.cronService.delJob(data.id);
    ctx.setState(immutable.set(state, ['cronMap', data.id, 'status'], 'stop'));
  }


}
