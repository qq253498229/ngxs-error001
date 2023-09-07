import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cronStatus',
})
export class CronStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if ('start' === value) return '开启';
    if ('stop' === value) return '关闭';
    return value;
  }

}
