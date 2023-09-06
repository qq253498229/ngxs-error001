import { Injectable } from '@angular/core';
import * as cron from 'cron-parser';
import { DatePipe } from '@angular/common';
import { CronJob } from 'cron';

@Injectable({
  providedIn: 'root',
})
export class CronService {
  /**
   *  # ┌────────────── second
   *  # │ ┌──────────── minute
   *  # │ │ ┌────────── hour
   *  # │ │ │ ┌──────── day of month
   *  # │ │ │ │ ┌────── month
   *  # │ │ │ │ │ ┌──── day of week
   *  # │ │ │ │ │ │
   *  # * * * * * *
   *
   *
   * field	value
   * second	0-59
   * minute	0-59
   * hour	0-23
   * day of month	1-31
   * month	1-12 (or names)
   * day of week	0-7 (or names, 0 or 7 are sunday)
   */
  globalCronJobMap: {
    [key: string]: CronJob
  } = {};

  constructor(
      private datePipe: DatePipe,
  ) {
  }

  /**
   * 传入一个表达式和一个时间字符串，返回该时间是否符合该表达式
   *
   * @param expression 表达式
   * @param time 时间字符串
   */
  check(expression: string, time: string) {
    cron.parseExpression(expression);
    return true;
  }

  checkExpression(expression: string) {
    cron.parseExpression(expression);
    return true;
  }

  /**
   * 传入一个表达式和一个时间字符串外加一个数字，返回该时间点后的满足表达式的指定数量个时间
   *
   * @param expression 表达式
   * @param time 时间字符串，格式: yyyy-MM-dd HH:mm:ss
   * @param count 数量，默认5
   */
  next(expression: string, time: string, count: number = 5): string[] {
    let options = {currentDate: new Date(time)};
    let parser = cron.parseExpression(expression, options);
    return Array.from({length: count}, () => this.datePipe.transform(parser.next().toDate(), 'yyyy-MM-dd HH:mm:ss') || '');
  }

  putJob(key: string, cronJob: CronJob) {
    if (!this.globalCronJobMap[key]) this.globalCronJobMap[key] = cronJob;
  }

  getJob(key: string) {
    return this.globalCronJobMap[key];
  }

  startJob(cronMap: any) {
    console.log('startJob', cronMap);
    for (let key in cronMap) {
      let obj = cronMap[key];
      if (obj.status === 'start') {
        let cronJob = this.newJob(obj.cron, obj.message);
        cronJob.start();
        this.putJob(key, cronJob);
      }
      console.log(`key:${key}, value:${JSON.stringify(obj)}`);
    }
  }

  newJob(cron: string, message: string) {
    return new CronJob(
        cron,
        () => {
          this.notification(message);
        },
        null,
        true,
        'Asia/Shanghai',
    );
  }

  notification(message: string) {
    console.log(`job exec, message:${message}`);
  }
}
