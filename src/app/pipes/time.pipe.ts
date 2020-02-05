import { Pipe, PipeTransform } from '@angular/core';
import * as m from 'moment';

@Pipe({
  name: 'etdTime'
})
export class EtdTimePipe implements PipeTransform {

  transform(value: Date): string {
    const md = m(value);
    let realMinutes = md.minutes().toString();
    if (md.minutes() < 10) {
      realMinutes = `0${md.minutes().toString()}`;
    }
    return `${md.hours()}.${realMinutes}`;
  }
}
