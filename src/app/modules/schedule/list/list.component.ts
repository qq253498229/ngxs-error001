import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../shared/notification/notification.service';
import { CronService } from '../../../shared/cron/cron.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dataSet = [
    {title: '111', cron: '* * * * * ?', address: '111'},
  ];


  constructor(
      private datePipe: DatePipe,
      private notify: NotificationService,
      private cron: CronService,
  ) {
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   let message = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '';
    //   this.notify.create('测试通知', message);
    // }, 5000);
    const cron = `* * * * * ?`;
    // console.log('check result', this.cron.check(cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || ''));
    console.log('check result', this.cron.checkDate(cron, new Date()));
    console.log('check result', this.cron.nextDate(cron, new Date()));
    // console.log('next result', this.cron.next(cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '', 5));

  }

  test1(data: { cron: string; address: string; title: string }) {
    console.log('data', data);
    console.log('check result', this.cron.check(data.cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || ''));
    console.log('check result', this.cron.checkDate(data.cron, new Date()));
    console.log('next result', this.cron.next(data.cron, this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '', 5));
  }
}
