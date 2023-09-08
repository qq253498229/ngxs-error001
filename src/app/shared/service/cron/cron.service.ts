import { Injectable } from '@angular/core';
import * as cron from 'cron-parser';
import { DatePipe } from '@angular/common';
import { CronJob } from 'cron';
import { NotificationService } from '../notification/notification.service';

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
@Injectable({
  providedIn: 'root',
})
export class CronService {

  globalCronJobMap: {
    [key: string]: CronJob | undefined
  } = {};

  constructor(
      private datePipe: DatePipe,
      private notificationService: NotificationService,
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

  /**
   * 检查表达式的格式是否正确
   * @param expression 表达式
   */
  checkExpression(expression: string) {
    try {
      cron.parseExpression(expression);
      return true;
    } catch (e) {
      return false;
    }
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
    for (let key in cronMap) {
      let obj = cronMap[key];
      if (obj.status === 'start') {
        let cronJob = this.newJob(obj.cron, obj.message);
        cronJob.start();
        this.putJob(key, cronJob);
      }
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

  delJob(id: string) {
    if (this.globalCronJobMap[id]) {
      this.globalCronJobMap[id]?.stop();
      delete this.globalCronJobMap[id];
    }
  }

  notification(message: string) {
    console.log(`job 执行了, 信息是:${message}`);
    // this.notificationService.create(`定时提醒`, message);
  }

}
