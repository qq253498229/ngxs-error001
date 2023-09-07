import { CronStatusPipe } from './cron-status.pipe';

describe('CronStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CronStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
