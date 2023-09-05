import { TestBed } from '@angular/core/testing';

import { CronService } from './cron.service';
import { DatePipe } from '@angular/common';

describe('CronService', () => {
  let service: CronService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [DatePipe]});
    service = TestBed.inject(CronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('校验cron表达式是否正确', () => {
    expect(service.checkExpression(`* * * * * *`)).toBe(true);
    expect(service.checkExpression(`* * * * * ?`)).toBe(true);
    expect(service.checkExpression(`33,34 * * * * ?`)).toBe(true);
    expect(service.checkExpression(`1-2 * * * * ?`)).toBe(true);
    expect(service.checkExpression(`0/3 * * * * ?`)).toBe(true);

    expect(() => service.checkExpression(`20-1 * * * * ?`)).toThrowError(`Invalid range: 20-1`);
    expect(() => service.checkExpression(`1 * * * * ?1`)).toThrow();
    expect(() => service.checkExpression(`-1-2 * * * * ?`)).toThrow();
    expect(() => service.checkExpression(`0/-3 * * * * ?`)).toThrow();
  });

  it('根据cron和指定时间获取接下来的五个时间点', () => {
    let pointTime = `2023-05-01 00:00:00`;
    expect(service.next('* * * * * ?', pointTime)).toEqual([
      `2023-05-01 00:00:01`,
      `2023-05-01 00:00:02`,
      `2023-05-01 00:00:03`,
      `2023-05-01 00:00:04`,
      `2023-05-01 00:00:05`,
    ]);
  });

});
