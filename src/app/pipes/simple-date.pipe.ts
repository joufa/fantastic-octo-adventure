import { Pipe, PipeTransform } from '@angular/core';
import * as m from 'moment';

@Pipe({
  name: 'dateString'
})
export class MomentToStringPipe implements PipeTransform {

  transform(value: m.Moment): string {
    return m(value).format('H.mm');
  }

}
