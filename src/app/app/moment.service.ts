import { Injectable } from '@angular/core';
import * as m from 'moment';

export interface DateTimeService {
  get(): any;
}

declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class MomentService implements DateTimeService {
  moment = m;

  get(): any {
    let moment = require('moment');
    if ('default' in moment) {
      moment = moment.default;
    }
    return moment;
  }

}
