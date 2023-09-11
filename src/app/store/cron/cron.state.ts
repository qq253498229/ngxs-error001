import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CronAction } from '.';
import * as immutable from 'object-path-immutable';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { EditDrawerComponent } from '../../modules/schedule/edit-drawer/edit-drawer.component';
import { CronService } from '../../shared/service/cron/cron.service';
import { ResetForm, UpdateFormValue } from '@ngxs/form-plugin';
import { uuid } from '../../shared/utils/common';

export interface CronStateModel {
  cronMap: {
    [key: string]: {
      status: 'start' | 'stop',
      cron: string,
      message: string,
      nextTime: number[],
    }
  };
  cronDrawerFlag: boolean;
  editDrawerForm: any;
}

@State<CronStateModel>({
  name: 'cron',
  defaults: {
    cronMap: {},
    cronDrawerFlag: false,
    editDrawerForm: {},
  },
})
@Injectable({
  providedIn: 'root',
})
export class CronState {

  constructor(
      private cronService: CronService,
      private drawer: NzDrawerService,
  ) {
  }

  @Action(CronAction.ResetConfig)
  ResetConfig(ctx: StateContext<CronStateModel>) {
    let state = ctx.getState();
    ctx.patchState({
      cronDrawerFlag: false,
    });
    //开启job，之前开启的在刷新页面之后还要重新开启
    this.cronService.startJob(state.cronMap);
  }

  @Action(CronAction.StartNotification)
  StartNotification(ctx: StateContext<CronStateModel>, {data}: CronAction.StartNotification) {
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'start') return;
    let cronJob = this.cronService.newJob(data.cron, data.message);
    if (!!cronJob) cronJob.start();
    this.cronService.putJob(data.id, cronJob);
    ctx.setState(immutable.set(state, ['cronMap', data.id, 'status'], 'start'));
  }

  @Action(CronAction.StopNotification)
  StopNotification(ctx: StateContext<CronStateModel>, {data}: CronAction.StopNotification) {
    let state = ctx.getState();
    if (!!state.cronMap && !!state.cronMap[data.id] && state.cronMap[data.id].status === 'stop') return;
    let cronJob = this.cronService.getJob(data.id);
    if (!!cronJob) cronJob.stop();
    this.cronService.delJob(data.id);
    if (!!state.cronMap && !!state.cronMap[data.id]) {
      ctx.setState(immutable.set(state, ['cronMap', data.id, 'status'], 'stop'));
    }
  }

  @Action(CronAction.CreateCronDrawer)
  CreateCronDrawer(ctx: StateContext<CronStateModel>) {
    let state = ctx.getState();
    if (state.cronDrawerFlag) return;
    let drawerRef = this.drawer.create({
      nzTitle: '新建任务',
      nzContent: EditDrawerComponent,
      nzWidth: 900,
    });
    drawerRef.afterClose.subscribe(() => {
      ctx.dispatch(new CronAction.CloseCronDrawer());
    });
    ctx.patchState({cronDrawerFlag: true});
    return ctx.dispatch(new ResetForm({path: 'cron.editDrawerForm'}));
  }

  @Action(CronAction.EditCronDrawer)
  EditCronDrawer(ctx: StateContext<CronStateModel>, {data}: CronAction.EditCronDrawer) {
    let state = ctx.getState();
    if (state.cronDrawerFlag) return;
    let drawerRef = this.drawer.create({
      nzTitle: '编辑任务',
      nzContent: EditDrawerComponent,
      nzWidth: 900,
    });
    drawerRef.afterClose.subscribe(() => {
      ctx.dispatch(new CronAction.CloseCronDrawer());
    });
    ctx.patchState({cronDrawerFlag: true});
    return ctx.dispatch(new UpdateFormValue({path: 'cron.editDrawerForm', value: data}));
  }

  @Action(CronAction.CloseCronDrawer)
  CloseCronDrawer(ctx: StateContext<CronStateModel>) {
    let state = ctx.getState();
    if (!state.cronDrawerFlag) return;
    ctx.patchState({cronDrawerFlag: false});
    return ctx.dispatch(new ResetForm({path: 'cron.editDrawerForm'}));
  }

  @Action(CronAction.Save)
  Save(ctx: StateContext<CronStateModel>) {
    let state = ctx.getState();
    let form = state.editDrawerForm;
    if (!form.dirty || 'VALID' !== form.status) return;
    let model = form.model;
    //没有id就是新建，需要给一个新的id
    if (!model.id) model.id = uuid();
    ctx.setState(immutable.set(state, ['cronMap', model.id], model));
    return ctx.dispatch([new CronAction.StopNotification(model), new CronAction.CloseCronDrawer()]);
  }

  @Action(CronAction.Delete)
  Delete(ctx: StateContext<CronStateModel>, {data}: CronAction.Delete) {
    let state = ctx.getState();
    this.cronService.delJob(data.id);
    ctx.setState(immutable.del(state, ['cronMap', data.id]));
    return ctx.dispatch(new CronAction.StopNotification(data));
  }
}
