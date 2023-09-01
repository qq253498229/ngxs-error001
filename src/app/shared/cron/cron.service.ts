import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CronService {
  /**
   *  # ┌────────────── second (optional)
   *  # │ ┌──────────── minute
   *  # │ │ ┌────────── hour
   *  # │ │ │ ┌──────── day of month
   *  # │ │ │ │ ┌────── month
   *  # │ │ │ │ │ ┌──── day of week
   *  # │ │ │ │ │ │
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

  //const validationRegex = /^(?:\d+|\*|\*\/\d+)$/;

  constructor() {
  }

  /**
   * 传入一个表达式和一个时间字符串，返回该时间是否符合该表达式
   *
   * @param expression 表达式
   * @param time 时间字符串
   */
  check(expression: string, time: string) {
    console.log('check', expression, time);
    return false;
  }

  checkDate(expression: string, time: Date) {
    console.log('checkDate', expression, time);
    return false;
  }

  /**
   * 传入一个表达式和一个时间字符串外加一个数字，返回该时间点后的满足表达式的指定数量个时间
   *
   * @param expression 表达式
   * @param time 时间字符串
   * @param count 数量，默认5
   */
  next(expression: string, time: string, count: number = 5) {
    return [];
  }

  nextDate(expression: string, time: Date, count: number = 5) {
    return [];
  }
}
