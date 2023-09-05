import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CronAction } from '.';
import { CronJob } from 'cron';
import * as immutable from 'object-path-immutable';
import { CronService } from '../../shared/cron/cron.service';

export interface CronStateModel {
  id: number;
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
    id: 1,
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

  @Action(CronAction.ChangeId)
  changeId(ctx: StateContext<CronStateModel>, data: CronAction.ChangeId) {
    ctx.patchState({
      id: data.id,
    });
  }

  @Action(CronAction.StartNotification)
  StartNotification(ctx: StateContext<CronStateModel>, {data}: CronAction.StartNotification) {
    console.log('start', data);
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'start') return;
    let cronJob = new CronJob(
        data.cron,
        () => {
          console.log(`job exec, message:${data.message}`);
        },
        null,
        true,
        'Asia/Shanghai',
    );
    cronJob.start();
    this.cronService.putJob(data.id, cronJob);
    console.log('cronJob', cronJob);
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
    console.log('stop', data);
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'stop') return;
    let existMap = state.cronMap[data.id];
    console.log('existMap', existMap);
    let cronJob: CronJob = this.cronService.getJob(data.id);
    console.log('cronJob', cronJob);
    cronJob.stop();
  }
}
