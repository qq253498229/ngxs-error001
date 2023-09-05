import { TestBed } from '@angular/core/testing';

import { CronService } from './cron.service';
import { DatePipe } from '@angular/common';

describe('CronService', () => {
  let service: CronService;
  let datePipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePipe,
      ],
    });
    service = TestBed.inject(CronService);
    datePipe = TestBed.inject(DatePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('校验cron表达式是否正确', () => {
    let current = datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss') || '';

    expect(() => service.check(`1,2,3 * * * * ?1`, current)).toThrowError(`表达式不是标准cron: 1,2,3 * * * * ?1`);
    expect(() => service.check(`1 * * * * ?1`, current)).toThrow();

    expect(service.check(`* * * * * *`, current)).toBe(true);
    expect(service.check(`1-2 * * * * ?`, current)).toBe(true);
    expect(() => service.check(`-1-2 * * * * ?`, current)).toThrow();
    expect(() => service.check(`20-1 * * * * ?`, current)).toThrow();

    expect(service.check(`0/3 * * * * ?`, current)).toBe(true);
    expect(() => service.check(`0/-3 * * * * ?`, current)).toThrow();
    expect(service.check(`33,34 * * * * ?`, current)).toBe(true);

  });
});
