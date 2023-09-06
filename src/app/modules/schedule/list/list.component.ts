import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../shared/notification/notification.service';
import { CronService } from '../../../shared/cron/cron.service';
import { Store } from '@ngxs/store';
import { CronAction, CronSelector } from '../../../store/cron';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @AutoUnsubscribe() list$ = this.store.select(CronSelector.list);
  dataSet = [
    {id: '6C940E6B-3A6D-447D-AA7F-562307DF8E1B', cron: '* * * * * *', message: '111'},
  ];


  constructor(
      private datePipe: DatePipe,
      private notify: NotificationService,
      private cron: CronService,
      private store: Store,
  ) {
  }

  ngOnInit(): void {
  }

  test1(data: any) {
    console.log('data', data);
  }

  startJob(data: any) {
    this.store.dispatch(new CronAction.StartNotification(data));
  }

  stopJob(data: any) {
    this.store.dispatch(new CronAction.StopNotification(data));
  }
}
