import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'simpleDate'
})
export class SimpleDatePipe implements PipeTransform {

  transform(value: moment.Moment): string {
    return value.format('hh.mm');
  }

}
