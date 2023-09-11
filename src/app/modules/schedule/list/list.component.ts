import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CronAction, CronSelector, SystemSelector } from '../../../store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @AutoUnsubscribe() list$: Observable<any> = this.store.select(CronSelector.list);
  @AutoUnsubscribe() currentTime$: Observable<any> = this.store.select(SystemSelector.currentTime);

  constructor(
      private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.currentTime$.subscribe(r => {
      console.log('currentTime$', r);
    });
  }

  startJob(data: any) {
    this.store.dispatch(new CronAction.StartNotification(data));
  }

  stopJob(data: any) {
    this.store.dispatch(new CronAction.StopNotification(data));
  }

  newJobDrawer() {
    this.store.dispatch(new CronAction.CreateCronDrawer());
  }

  deleteJob(data: any) {
    this.store.dispatch(new CronAction.Delete(data));
  }

  editJob(data: any) {
    this.store.dispatch(new CronAction.EditCronDrawer(data));
  }
}
