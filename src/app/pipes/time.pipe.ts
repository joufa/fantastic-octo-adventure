import { Pipe, PipeTransform } from '@angular/core';
import * as m from 'moment';

@Pipe({
  name: 'etdTime'
})
export class EtdTimePipe implements PipeTransform {

  transform(value: Date): string {
    const md = m(value);
    return `${md.hours()}.${md.minutes()}`;
  }
}
