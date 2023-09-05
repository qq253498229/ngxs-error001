import { Injectable } from '@angular/core';

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

  constructor() {
  }

  /**
   * 传入一个表达式和一个时间字符串，返回该时间是否符合该表达式
   *
   * @param expression 表达式
   * @param time 时间字符串
   */
  check(expression: string, time: string) {
    if (!this.isCron(expression)) throw new Error(`表达式不是标准cron: ${expression}`);
    console.log('check', expression, time);
    return true;
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

  private isCron(expression: string) {
    let splits = expression.split(' ');
    if (splits.length !== 6) return false;

    let commonReg = new RegExp(/^((\*)|([0-59]+[,0-59]*)|([0-59]+-[0-59]+)|([0-59]+\/\d+)|(\*\/\d+))$/);
    if (!commonReg.test(splits[0])) return false;//second
    if (!commonReg.test(splits[1])) return false;//minute
    if (!commonReg.test(splits[2])) return false;//hour
    if (!commonReg.test(splits[3])) return false;//day of month
    if (!commonReg.test(splits[4])) return false;//month
    if (!new RegExp(/^((\*)|([0-59]+[,0-59]*)|([0-59]+-[0-59]+)|([0-59]+\/\d+)|(\*\/\d+)|\?)$/).test(splits[5])) return false;//day of week
    let exec = new RegExp(/^([0-59]+)-([0-59]+)$/).exec(splits[0]);
    if (!!exec && exec[1] >= exec[2]) return false;//第二个数字没有第一个大
    console.log(`splits[0]:${splits[0]}, exec:${exec}`);
    console.log('splits', splits);
    return true;
  }
}
