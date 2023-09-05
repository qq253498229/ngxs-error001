import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../shared/notification/notification.service';
import { CronService } from '../../../shared/cron/cron.service';
import { Store } from '@ngxs/store';
import { CronAction } from '../../../store/cron';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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
    // setInterval(() => {
    //   let message = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '';
    //   this.notify.create('测试通知', message);
    // }, 5000);
    // console.log('check result1', this.cron.check(`1,2,3 * * * * ?1`, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || ''));
    // console.log('check result2', this.cron.check(`1 * * * * ?1`, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || ''));
    // console.log('next result', this.cron.next(cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '', 5));

  }

  test1(data: any) {
    console.log('data', data);
    // console.log('check result', this.cron.check(data.cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || ''));
    // console.log('next result', this.cron.next(data.cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '', 5));
  }

  startJob(data: any) {
    this.store.dispatch(new CronAction.StartNotification(data));
  }

  stopJob(data: any) {
    this.store.dispatch(new CronAction.StopNotification(data));
  }
}
